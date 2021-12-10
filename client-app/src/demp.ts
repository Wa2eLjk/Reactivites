export interface Duck {
    name: string,
    numLegs: number,
    makesound: (sound:string) => void;
}


const duck1: Duck = {
    name:'hey',
    numLegs:2,
    makesound: (sound: any) => console.log(sound),
}
const duck2: Duck = {
    name:'hej',
    numLegs:2,
    makesound: (sound: any) => console.log(sound),
}

duck1.makesound('quack');

export const ducks = [duck1,duck2]