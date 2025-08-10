import React, { useState } from 'react';
import { Switch } from './components/ui/switch';
import { Slider } from './components/ui/slider';
import { Clock, Heart } from 'lucide-react';

export default function App() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [rotationAngle, setRotationAngle] = useState([15]);
  const [frequency, setFrequency] = useState([5]);

  const nextReminderTime = 4; // minutes

  return (
    <div className="w-80 bg-white shadow-2xl rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-medium text-gray-900">Dogtor</h1>
            <p className="text-sm text-gray-500">颈椎健康提醒助手</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-6">
        {/* Auto Rotation Toggle */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-medium text-gray-900">自动旋转提醒</h3>
              <p className="text-sm text-gray-500 mt-1">开启后将定期旋转页面提醒您活动颈椎</p>
            </div>
            <Switch
              checked={isEnabled}
              onCheckedChange={setIsEnabled}
              className="data-[state=checked]:bg-blue-500"
            />
          </div>
        </div>

        {/* Rotation Angle */}
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-4">旋转角度</h3>
          
          {/* Protractor */}
          <div className="flex justify-center mb-4">
            <div className="relative w-48 h-24">
              <svg
                width="192"
                height="96"
                viewBox="0 0 192 96"
                className="absolute inset-0"
              >
                {/* Main arc */}
                <path
                  d="M 16 80 A 80 80 0 0 1 176 80"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                
                {/* Tick marks */}
                {[0, 15, 30, 45].map((angle) => {
                  const radian = (angle * Math.PI) / 180;
                  const x1 = 96 + 75 * Math.cos(Math.PI - radian);
                  const y1 = 80 - 75 * Math.sin(Math.PI - radian);
                  const x2 = 96 + 80 * Math.cos(Math.PI - radian);
                  const y2 = 80 - 80 * Math.sin(Math.PI - radian);
                  
                  return (
                    <line
                      key={angle}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#d1d5db"
                      strokeWidth="1"
                    />
                  );
                })}
                
                {/* Current angle line */}
                {(() => {
                  const currentRadian = (rotationAngle[0] * Math.PI) / 180;
                  const x = 96 + 70 * Math.cos(Math.PI - currentRadian);
                  const y = 80 - 70 * Math.sin(Math.PI - currentRadian);
                  
                  return (
                    <line
                      x1="96"
                      y1="80"
                      x2={x}
                      y2={y}
                      stroke="#1f2937"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  );
                })()}
                
                {/* Center dot */}
                <circle
                  cx="96"
                  cy="80"
                  r="4"
                  fill="#1f2937"
                />
              </svg>
            </div>
          </div>

          {/* Angle display */}
          <div className="text-center mb-4">
            <span className="text-2xl font-medium text-gray-900">{rotationAngle[0]}°</span>
          </div>

          {/* Angle slider */}
          <div className="px-2">
            <Slider
              value={rotationAngle}
              onValueChange={setRotationAngle}
              max={45}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2 px-1">
              <span>0°</span>
              <span>45°</span>
            </div>
          </div>
        </div>

        {/* Rotation Frequency */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-gray-600" />
            <h3 className="text-base font-medium text-gray-900">旋转周期</h3>
          </div>
          
          <div className="mb-4">
            <span className="text-base text-gray-900">每隔 {frequency[0]} 分钟</span>
          </div>

          <div className="px-2">
            <Slider
              value={frequency}
              onValueChange={setFrequency}
              max={30}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2 px-1">
              <span>1分钟</span>
              <span>30分钟</span>
            </div>
          </div>
        </div>

        {/* Status */}
        {isEnabled && (
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span>下次提醒: {nextReminderTime}分钟后</span>
            </div>
          </div>
        )}

        {/* Bottom message */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <span className="text-sm text-gray-500">保护您的颈椎健康</span>
          <Heart className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}