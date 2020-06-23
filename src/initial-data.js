const initialData = {
  rewards: {
    'reward-1': { id: 'reward-1', content: 'Reward A' },
    'reward-2': { id: 'reward-2', content: 'Reward B' },
    'reward-3': { id: 'reward-3', content: 'Reward C' },
    'reward-4': { id: 'reward-4', content: 'Reward D' },
  },
  columns: {
    'category-0': {
      id: 'category-0',
      cloneable: true,
      title: 'Rewards',
      rewardIds: ['reward-1', 'reward-2', 'reward-3', 'reward-4'],
    },
    'category-1': {
      id: 'category-1',
      title: 'Category A',
      rewardIds: [],
    },
    'category-2': {
      id: 'category-2',
      title: 'Category B',
      rewardIds: [],
    },
    'category-3': {
      id: 'category-3',
      title: 'Category C',
      rewardIds: [],
    },
  },
  columnOrder: ['category-0', 'category-1', 'category-2', 'category-3'],
};

export default initialData;