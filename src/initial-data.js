const initialData = {
  rewards: {
    'reward-1-0': { id: 'reward-1-0', content: 'Reward A', clones: [] },
    'reward-2-0': { id: 'reward-2-0', content: 'Reward B', clones: [] },
    'reward-3-0': { id: 'reward-3-0', content: 'Reward C', clones: [] },
    'reward-4-0': { id: 'reward-4-0', content: 'Reward D', clones: [] },
  },
  columns: {
    'category-0': {
      id: 'category-0',
      cloneable: true,
      title: 'Rewards',
      rewardIds: ['reward-1-0', 'reward-2-0', 'reward-3-0', 'reward-4-0'],
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