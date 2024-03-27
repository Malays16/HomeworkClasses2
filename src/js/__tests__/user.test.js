import { Character, Bowerman, Swordsman, Magician, Daemon, Undead, Zombie } from '../Character';

jest.mock('../http');

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Character', () => {
  test('throw error if name is not a string', () => {
    expect(() => new Character(123, 'Bowerman')).toThrow('Имя должно быть строкой');
  });

  test('throw error if name length is less than 2', () => {
    expect(() => new Character('1', 'Bowerman')).toThrow('Имя должно быть от 2 до 10 символов');
  });

  test('throw error if name length is more than 10', () => {
    expect(() => new Character('Malays50000', 'Bowerman')).toThrow('Имя должно быть от 2 до 10 символов');
  });

  test('throw error if type is not correct', () => {
    expect(() => new Character('Malays', 'Priest')).toThrow('Такого персонажа нет');
  });

  test('should create Character with name and type', () => {
    const character = new Character('Malays', 'Bowerman');

    expect(character).toEqual({
      name: 'Malays',
      type: 'Bowerman',
      health: 100,
      level: 1,
      attack: 0,
      defence: 0,
    });
  });
});

describe('Bowerman', () => {
  test('should create Bowerman', () => {
    const character = new Bowerman('Vasiliy');
    expect(character).toEqual({
      name: 'Vasiliy',
      type: 'Bowerman',
      health: 100,
      level: 1,
      attack: 25,
      defence: 25,
    });
  });
});

describe('Swordsman', () => {
  test('should create Swordsman', () => {
    const character = new Swordsman('Ivan');
    expect(character).toEqual({
      name: 'Ivan',
      type: 'Swordsman',
      health: 100,
      level: 1,
      attack: 40,
      defence: 10,
    });
  });
});

describe('Magician', () => {
  test('should create Magician', () => {
    const character = new Magician('Frostmage');
    expect(character).toEqual({
      name: 'Frostmage',
      type: 'Magician',
      health: 100,
      level: 1,
      attack: 10,
      defence: 40,
    });
  });
});

describe('Daemon', () => {
  test('should create Daemon', () => {
    const character = new Daemon('Illidan');
    expect(character).toEqual({
      name: 'Illidan',
      type: 'Daemon',
      health: 100,
      level: 1,
      attack: 10,
      defence: 40,
    });
  });
});

describe('Undead', () => {
  test('should create Undead', () => {
    const character = new Undead('Kelthuzad');
    expect(character).toEqual({
      name: 'Kelthuzad',
      type: 'Undead',
      health: 100,
      level: 1,
      attack: 25,
      defence: 25,
    });
  });
});

describe('Zombie', () => {
  test('should create Zombie', () => {
    const character = new Zombie('Vurdalak');
    expect(character).toEqual({
      name: 'Vurdalak',
      type: 'Zombie',
      health: 100,
      level: 1,
      attack: 40,
      defence: 10,
    });
  });
});

describe('levelUp', () => {
  test('levelUp should increase level, attack, and defence when health is more than 0', () => {
    const character = new Zombie('Vurdalak');
    character.levelUp();
    expect(character.level).toBe(2);
    expect(character.attack).toBe(48);
    expect(character.defence).toBe(12);
    expect(character.health).toBe(100);
  });

  test('throw error if health is 0', () => {
    const character = new Zombie('Vurdalak');
    character.health = 0;
    expect(() => character.levelUp()).toThrow('Нельзя повысить левел умершего');
  });
});


describe('damage', () => {
  test('should reduce health when points is more than 0 and health is more than 0', () => {
    const character = new Character('Test', 'Bowerman');
    character.health = 100;
    character.defence = 10;

    character.damage(10);

    expect(character.health).toBe(91);
  });

  test('should not reduce health when points is 0', () => {
    const character = new Character('Test', 'Bowerman');
    character.health = 100;
    character.defence = 10;

    character.damage(0);

    expect(character.health).toBe(100);
  });

  test('should not reduce health when health is 0', () => {
    const character = new Character('Test', 'Bowerman');
    character.health = 0;
    character.defence = 10;

    character.damage(10);

    expect(character.health).toBe(0);
  });
});