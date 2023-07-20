import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { create } from 'zustand';

/* 🚨 devtool, immer 적용한 스토어입니다. 복붙해서 새로운 스토어를 하나씩 만들어주세요 */
/* 각각의 스토어를 생성하기 때문에 redux-devtool 에서 별도로 분리되어 표시됩니다. */

type CounterStore = {
  counter: number;
};

type Actions = {
  increment: () => void;
};

const exampleStore = create(
  devtools(
    immer<CounterStore & Actions>((set) => ({
      counter: 0,
      increment: () =>
        set((state) => {
          state.counter += 1;
        }),
    })),
    {
      name: 'exampleStore',
    }
  )
);

export default exampleStore;
