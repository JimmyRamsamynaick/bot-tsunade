
function spinWheel(rewards) {
  const totalWeight = rewards.reduce((sum, reward) => sum + reward.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < rewards.length; i++) {
    random -= rewards[i].weight;
    if (random <= 0) {
      return { reward: rewards[i], index: i };
    }
  }
  
  return { reward: rewards[rewards.length - 1], index: rewards.length - 1 };
}

module.exports = { spinWheel };
