const { createCanvas } = require('canvas');

const WHEEL_SIZE = 500;
const CENTER = WHEEL_SIZE / 2;
const RADIUS = WHEEL_SIZE / 2 - 20;
const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
  '#BB8FCE', '#85C1E9', '#F8B500', '#00CED1'
];

function drawWheel(ctx, rotation, rewards, winningIndex = null) {
  ctx.clearRect(0, 0, WHEEL_SIZE, WHEEL_SIZE);
  ctx.fillStyle = '#2C3E50';
  ctx.fillRect(0, 0, WHEEL_SIZE, WHEEL_SIZE);
  
  const numSegments = rewards.length;
  const segmentAngle = (2 * Math.PI) / numSegments;
  
  ctx.save();
  ctx.translate(CENTER, CENTER);
  ctx.rotate(rotation);
  
  for (let i = 0; i < numSegments; i++) {
    const startAngle = i * segmentAngle;
    const endAngle = startAngle + segmentAngle;
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, RADIUS, startAngle, endAngle);
    ctx.closePath();
    
    ctx.fillStyle = COLORS[i % COLORS.length];
    ctx.fill();
    
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    if (winningIndex === i) {
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#FFD700';
      ctx.stroke();
    }
    
    ctx.save();
    const angle = startAngle + segmentAngle / 2;
    const x = Math.cos(angle) * (RADIUS * 0.6);
    const y = Math.sin(angle) * (RADIUS * 0.6);
    ctx.translate(x, y);
    ctx.rotate(angle + Math.PI / 2);
    ctx.scale(-1, 1);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 10px Arial';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.fillText(rewards[i].name, 0, 4);
    ctx.restore();
  }
  
  ctx.restore();
  
  ctx.beginPath();
  ctx.arc(CENTER, CENTER, 25, 0, 2 * Math.PI);
  ctx.fillStyle = '#1A252F';
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(CENTER, 15);
  ctx.lineTo(CENTER - 12, 35);
  ctx.lineTo(CENTER + 12, 35);
  ctx.closePath();
  ctx.fillStyle = '#E74C3C';
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function generateWheelImage(rotation, rewards, winningIndex = null) {
  const canvas = createCanvas(WHEEL_SIZE, WHEEL_SIZE);
  const ctx = canvas.getContext('2d');
  drawWheel(ctx, rotation, rewards, winningIndex);
  return canvas.toBuffer('image/png');
}

module.exports = {
  generateWheelImage
};
