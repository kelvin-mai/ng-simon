interface Sounds {
  blue: string;
  red: string;
  yellow: string;
  green: string;
}

export enum Colors {
  red,
  green,
  blue,
  yellow
}

export interface ClassList {
  blue: boolean;
  red: boolean;
  yellow: boolean;
  green: boolean;
}

export const sounds: Sounds = {
  blue: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
  red: 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
  yellow: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
  green: 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
};

export const sleep: Function = time =>
  new Promise(resolve => setTimeout(resolve, time));

export const asyncForEach: Function = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
