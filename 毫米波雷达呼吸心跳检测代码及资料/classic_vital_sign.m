
clc;
clear all;
close all;
%% =========================================================================
%% 读取数据部分 
numADCSamples = 200; % number of ADC samples per chirp采样点数200
numADCBits = 16;     % number of ADC bits per sample
numTX=1;                %发射天线数
numRX = 4;           % number of receivers：接收天线数
numLanes = 2;        % do not change. number of lanes is always 2
isReal = 0;          % set to 1 if real only data, 0 if complex data：1为实采样，0为复采样
chirpLoop = 2;
%1发4收：实际处理时的数据是单发单收的
%% =========================================================================
%% 雷达参数设置
%1T4R（启用一条发射天线TX0）
%一帧2个chrip，每个chirp 在adc采样时有 200个采样点，共1024帧，帧周期50ms，共51.2s
Fs=4e6;             %ADC采样率 ：4Msps            
c=3*1e8;            %光速
ts=numADCSamples/Fs;    %ADC采样时间
slope=64.985e12;                 %调频斜率 ：~64.985MHz/us
B_valid =ts*slope;                %有效带宽：3.25GHz
detaR=c/(2*B_valid);          %距离分辨率：4.615cm（range-bin）ΔR=0.04615
startFreq = 60.25e9;              %起始频率 ：60.25GHz
lambda=c/startFreq;              % 雷达信号波长：  λ=c/f0 = 5mm
%% 读取Bin文件（数据预处理）
Filename = 'adc_data21.bin';       %解析不同的数据修改该文件名即可
fid = fopen(Filename,'r');
adcDataRow= fread(fid, 'int16');
if numADCBits ~= 16
    l_max = 2^(numADCBits-1)-1;
    adcDataRow(adcDataRow > l_max) = adcDataRow(adcDataRow > l_max) - 2^numADCBits;
    %16bit的ADC，最高表示数据为[-32768，32767]，即[-2^15,2^15]，
    % 剩下的1位的符号位，程序中数值高于32767的都要减去65536。
end
fclose(fid);

process_num = 1024;                     %只对process_num帧的数据做处理
 %fileSize1 = size(adcDataRow, 1);
fileSize=process_num*2*numADCSamples*numTX*numRX*2;   
%注:数据包大小是1024帧，为1024*2*numADCSamples*numTX*numRX*2; 
PRTnum = fix(fileSize/(numADCSamples*numRX));
fileSize = PRTnum * numADCSamples*numRX;
adcData = adcDataRow(1:fileSize);
% real data reshape, filesize = numADCSamples*numChirps
if isReal
    numChirps = fileSize/numADCSamples/numRX;
    LVDS = zeros(1, fileSize);
    %create column for each chirp
    LVDS = reshape(adcData, numADCSamples*numRX, numChirps);
    %each row is data from one chirp
    LVDS = LVDS.';
else%复采样
    numChirps = fileSize/2/numADCSamples/numRX;     %含有实部虚部，除以2
    %共2048个chirps（1024帧*2个chirp）
    LVDS = zeros(1, fileSize/2);
    %combine real and imaginary part into complex data将实部虚部结合成复数
    %read in file: 2I is followed by 2Q     adcData数据组成:两个实部，接着是两个虚部
    counter = 1;
    for i=1:4:fileSize-1        %1T4R
        LVDS(1,counter) = adcData(i) + sqrt(-1)*adcData(i+2);       %复数形式
        LVDS(1,counter+1) = adcData(i+1)+sqrt(-1)*adcData(i+3); 
        counter = counter + 2;
    end
    % create column for each chirp：每一列为chirp
    LVDS = reshape(LVDS, numADCSamples*numRX, numChirps);
    %each row is data from one chirp：每一行为chirp
    LVDS = LVDS.';
end

%% 重组数据（4条接收天线的复数数据）
adcData = zeros(numRX,numChirps*numADCSamples);
for row = 1:numRX
    for i = 1: numChirps
        adcData(row, (i-1)*numADCSamples+1:i*numADCSamples) = LVDS(i, (row-1)*numADCSamples+1:row*numADCSamples);
    end
end
%重组数据retVal：200*2048矩阵，每一列为一个chirp
retVal= reshape(adcData(1, :), numADCSamples, numChirps); %取第一个接收天线数据，数据存储方式为一个chirp一列

process_adc=zeros(numADCSamples,numChirps/2);%每帧中的两个chrip取第一个，200*1024

for nchirp = 1:2:numChirps  %1T4R （1T1R）只处理单发单收的数据，并且只处理两个chrip取出的第一个
    process_adc(:, (nchirp-1)/2+1) = retVal(:,nchirp);
end
%% =============经过以上处理获得了最为关键的等待信号算法处理的数据：process_adc（200*2400矩阵）==============
%% 距离维FFT（1个chirp的FFT)
figure;
plot((0:numADCSamples-1)*detaR,db(abs(fft(process_adc(:,1)))));
xlabel('距离（m）');
ylabel('幅度(dB)');
title('距离维FFT（1个chirp）');
[X,Y] = meshgrid((0:numADCSamples-1)*detaR, ...
   (1:numChirps/2));   
%三维矩阵显示

fft1d= zeros(numChirps/2,numADCSamples);

    for chirp_fft=1:numChirps/2
        fft1d(chirp_fft,:) = abs(fft((process_adc(:,chirp_fft))));%
    end

figure;
  mesh(X,Y,fft1d);
xlabel('距离(m)');
ylabel('脉冲chrip数');
zlabel('幅度');
title('距离维-1DFFT结果');

%% 相位解缠绕部分参数
RangFFT = 256;
fft_data_last = zeros(1,RangFFT); %能量幅值积累
range_max = 0;
adcdata = process_adc;
numChirps = size(adcdata, 2);%1024chrip          numChirps变为1024

%% 距离维FFT
fft_data = fft(adcdata,RangFFT); 
fft_data = fft_data.';%非共轭翻转1024*256

%% 消除静态干扰
% 使用相量均值相消算法（平均相消算法）:效果较差
%{
fft1d_avg = zeros(1024,256);
avg = sum(fft_data(:,:))/256;   %参考接收脉冲
for chirp=1:1024
        fft1d_avg(chirp,:) = fft_data(chirp,:)-avg;
end
fft_data=fft1d_avg;
%}
%
%MTI：动目标显示算法
%{
for ii=1:numChirps-1                % 滑动对消，少了一个脉冲
     fft_data(ii,:) = fft_data(ii+1,:)-fft_data(ii,:);
end
%在这里增加了最后一个chirp的消除：（有待改进）
 fft_data(numChirps,:) =fft_data(numChirps-1 ,:);
%}
%MTD：动目标检测
%{
for ii=1:256
    avg =  sum(fft_data(:,ii))/1024;
     fft_data(:,ii) =  fft_data(:,ii) -  avg ;
end
%}
fft_data_abs = abs(fft_data);%复数取模值（幅度）

%此处采样点扩展为256，故距离分辨率调整为0.03606m
deltaR=Fs*c/2/slope/RangFFT;
fft_data_abs(:,1:10)=0;         %置零，去除直流分量

%三维图生成
fft11d= zeros(numChirps,RangFFT);

    for b=1:numChirps
        fft11d(b,:) = (fft_data_abs(b,:));%
    end
%此处采样点扩展为256，故距离分辨率调整为0.03606m
[M,N] = meshgrid((0:RangFFT-1)*deltaR, ...
   (1:numChirps));   

figure;
mesh(M,N,fft11d);
xlabel('距离(m)');
ylabel('脉冲chrip数');zlabel('幅度');
title('静态杂波滤除后：距离维-1DFFT结果');

%% 提取相位 extract phase(相位反正切)
%实虚部分离（为了提取rangebin的相位）
real_data = real(fft_data);%实部
imag_data = imag(fft_data);%虚部

for i = 1:numChirps
    for j = 1:RangFFT  %对每一个range bin取相位 extract phase（弧度rad）
        angle_fft(i,j) = atan2(imag_data(i, j),real_data(i, j));
    end
end

% Range-bin tracking 找出能量最大的点，即人体的位置  
for j = 1:RangFFT
   if((j*detaR)<2.5 &&(j*detaR)>0.5) % 限定了检测距离为0.5-2.5m
        for i = 1:numChirps             % 进行非相干积累
            fft_data_last(j) = fft_data_last(j) + fft_data_abs(i,j);%通过FFT后的多普勒信号的幅值进行定位
        end
        
        if ( fft_data_last(j) > range_max)
            range_max = fft_data_last(j);
            max_num = j;  %最大能量序列号（range bin）maxnum
        end
    end
end 

%% 取出能量最大点的相位  extract phase from selected range bin
angle_fft_last = angle_fft(:,max_num);%1024个chrip的某列range bin的相位
% 提取相位信号（原始）
figure;
plot(angle_fft_last);
xlabel('时间/点数（N）：对应每个chrip');
ylabel('相位');
title('未展开相位信号');
phi=angle_fft_last;
%% 进行相位解缠  phase unwrapping(手动解)，自动解可以采用MATLAB自带的函数unwrap()
%或称为相位解卷绕，由于相位值在 [ − π ,π ] 之间，而我们需要相位展开以获取实际的位移曲线，
% 因此每当连续值之间的相位差大于或者小于±π时，通过从相位中减去2π来获得相位展开。
% n = 1;
% for i = 2:numChirps
%     diff = angle_fft_last(i) - angle_fft_last(i-1); %连续值之间的相位差
%     if diff > pi
%         angle_fft_last(i:end) = angle_fft_last(i:end) - 2*pi;
%         n = n + 1;  
%     elseif diff < -pi
%         angle_fft_last(i:end) = angle_fft_last(i:end) + 2*pi;  
%     end
% end
%相位解包方法2：
for i = 2:numChirps
    diff = angle_fft_last(i) - angle_fft_last(i-1); %连续值之间的相位差
    while((diff>pi) || (diff<-pi))
        if diff > pi
                angle_fft_last(i) = angle_fft_last(i) - 2*pi;
                  diff = angle_fft_last(i) - angle_fft_last(i-1); %连续值之间的相位差
        elseif diff < -pi
                angle_fft_last(i:end) = angle_fft_last(i:end) + 2*pi;  
                diff = angle_fft_last(i) - angle_fft_last(i-1); %连续值之间的相位差
        end
    end
end
%
figure;
plot(angle_fft_last);
xlabel('时间/点数（N）：对应每个chirp');
ylabel('相位');
title('相位解缠  phase unwrapping后的结果');
%unwrap函数：
% phi=unwrap(phi);
% figure;
% plot(phi);

%% phase difference 相位差分
%通过减去连续的相位值，对展开的相位执行相位差运算，
% 这将有利于        ：增强心跳信号并消除硬件接收机存在的相位漂移，抑制呼吸信号及其谐波
angle_fft_last2=zeros(1,numChirps);
% for i = 1:numChirps-1
%     angle_fft_last2(i) = angle_fft_last(i+1) - angle_fft_last(i);
%     angle_fft_last2(numChirps)=angle_fft_last(numChirps)-angle_fft_last(numChirps-1);
% end 
% 方法：相位差分是通过不断将当前采样点展开相位与前一采样点做差实现
for i = 2:numChirps
    angle_fft_last2(i) = angle_fft_last(i) - angle_fft_last(i-1);
end 

figure;
plot(angle_fft_last2);
xlabel('点数（N）：对应每个chrip');
ylabel('相位（rad）');
title('相位差分后信号');
%% 脉冲噪声去除：滑动平均滤波（选取 0.25 s 的滑动窗口，窗口长度为5）
%   去除由于测试环境引起的脉冲噪声
phi=smoothdata(angle_fft_last2,'movmean',5);
figure;
plot(phi);
title('滑动平均滤波相位信号');
%对相位信号作FFT 
N1=length(phi);
 FS=20;
FFT = abs(fft(phi));              %--FFT                         取模，幅度
f=(0:N1-1)*(FS/N1);             %其中每点的频率
%傅里叶变换结果对称
figure;
plot(f(1:N1/8),FFT(1:N1/8)) %取前一部分放大观察
xlabel('频率（f/Hz）');
ylabel('幅度');
title('相位信号FFT  ');
%%  IIR带通滤波 Bandpass Filter 0.1-0.5hz，输出呼吸信号
fs =20; %呼吸心跳信号的采样率
%设计IIR，4阶巴特沃斯带通滤波器
load('coe3.mat', 'breath_pass');
breath_data = filter(breath_pass,phi); 

figure;
plot(breath_data);
xlabel('时间(s)');
xticklabels({'0','10','20','30','40','50','60'});
ylabel('幅度');
title('呼吸时域波形');

%% 谱估计 -FFT -Peak interval
N1=length(breath_data);
fshift = (-N1/2:N1/2-1)*(fs/N1); % 
breath_fre = abs(fftshift(fft(breath_data)));              %--FFT                         取模，幅度（双边频谱）
breath = abs(fft(breath_data));                                     %
%傅里叶变换结果对称

figure;
% plot(fshift,breath_fre);
plot(f(1:130),breath(1:130));   %取前一部分放大观察
xlabel('频率（f/Hz）');
ylabel('幅度');
title('呼吸信号FFT  ');

breath_fre_max = 0; % 呼吸频率
for i = 1:length(breath_fre)                     %谱峰最大值搜索
    if (breath_fre(i) > breath_fre_max)    
        breath_fre_max = breath_fre(i);
        breath_index=i;
    end
end

breath_count =(fs*(numChirps/2-(breath_index-1))/numChirps)*60;        %呼吸频率解算

%% IIR带通滤波 Bandpass Filter 0.8-2hz，输出心跳的数据
%  设计IIR，8阶巴特沃斯带通滤波器
load('coe4.mat', 'heart_pass');
% load('coe5.mat', 'Hd');
% COE2=chebyshev_IIR2;
% save coe2.mat COE2;
heart_data = filter(heart_pass,phi); 
% heart_data = filter(Hd,phi); 
figure;
plot(heart_data);
xlabel('时间(s)');
xticklabels({'0','10','20','30','40','50','60'});
ylabel('幅度');
title('心跳时域波形');

N1=length(heart_data);
fshift = (-N1/2:N1/2-1)*(fs/N1); % zero-centered frequency
f=(0:N1-1)*(fs/N1);       %其中每点的频率
 heart_fre = abs(fftshift(fft(heart_data))); 
heart=abs(fft(heart_data));

figure;
% plot(fshift,heart_fre);
plot(f(1:200),heart(1:200));
xlabel('频率（f/Hz）');
ylabel('幅度');
title('心跳信号FFT');

heart_fre_max = 0; 
for i = 1:length(heart_fre)/2 
    if (heart_fre(i) > heart_fre_max)    
        heart_fre_max = heart_fre(i);
        if(heart_fre_max<1e-2)          %幅度置信 判断是否是存在人的心跳
            heart_index=1025;%不存在
        else
            heart_index=i;
        end
    end
end
heart_count =(fs*(numChirps/2-(heart_index-1))/numChirps)*60;%心跳频率解算
%% 提取心跳波的包络线，归一化心跳波
% 通过取心跳分量绝对值的移动平均值估计心跳波的包络
heartdata=abs(heart_data);
[envHigh, envLow] = envelope(heart_data,15,'peak');
envMean = (envHigh+envLow)/2;
y=smooth(heartdata,10);
t=1:1024;
figure;
plot(t,heartdata, ...
    t,envHigh, ...
     t,envMean, ...
     t,envLow)
axis tight
legend('heart_data','High','Mean','Low','location','best')
title('提取心跳波包络曲线');
%移动平均滤波
yy=smooth(heart_data);
figure;
plot(t,heart_data,t,yy,'r',t,y);
legend('heartdata','filtered','envelop','location','best');
title('估计包络、滤波后的心跳波');

%归一化:归一化后的波是滤波后的心跳波和估计包络之间的比率
for k=1:1024
    mmave(k,1)=yy(k,1)/y(k,1);
end
figure
plot(t,mmave);
title('归一化后的心跳波');






%% 1024帧，51.2s

% 如果数据长度够长，则雷达会51.2s对呼吸数据和心跳数据进行一次刷新，
%以便实现更为精确的检测。

disp(['呼吸：',num2str(breath_count),'  心跳：',num2str(heart_count)])

%% 动画演示
%读者自行开发
% time=8;
% k=8;
% for kk=1:2*k
% 
% for  t=1:time
%  subplot(2,1,1)
% % figure;
% plot(breath_data(1:128*t));
% xlabel('时间/点数');
% ylabel('幅度');
% title('呼吸时域波形');
% 
% %% 谱估计 -FFT -Peak interval
% N1=length(breath_data(1:128*t));
% fshift = (-N1/2:N1/2-1)*(fs/N1); % zero-centered frequency    频谱分辨率为0.0195Hz
% breath_fre = abs(fftshift(fft(breath_data(1:128*t))));              %--FFT                         取模，幅度
% %傅里叶变换结果对称（breath_fre中第486与537的值都为最大值）
% breath_fre_max = 0; % 呼吸频率
% for i = 1:length(breath_fre)                     %谱峰最大值搜索
%     if (breath_fre(i) > breath_fre_max)    
%         breath_fre_max = breath_fre(i);
%         breath_index=i;
%     end
% end
% 
% breath_count =(fs*(128*t/2-(breath_index-1))/(128*t))*60;        %呼吸频率解算
% subplot(2,1,2)
% % figure;
% plot(fshift,breath_fre);
% xlabel('频率（f/Hz）');
% ylabel('幅度');
% title(['呼吸信号FFT  :',num2str(breath_count/60),'Hz    呼吸率：',num2str(breath_count)]);
% 
% pause(1);
% 
% end
% end
%% END &thank YOU !



