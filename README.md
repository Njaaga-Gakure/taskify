# Taskify App

## Introduction to TypeScript

Static typing of typescript variables.

    let name: string;
    let age: number | string; /* union type(either number or string)
    let isStudent: boolean;
    let hobbies: string[]; /* Array of strings */
    let role: [string, number]; /* tuple */
    let printName: (name: string) => void;

    /*defining a type */
    type Person = {
        name: string;
        age: number;
        roles?: string[]; /* `?` signifies optional properties
    }

    let person: Person;

    interface Person {
        name: string;
        age: number;
    }


    /* extending a type
    type X = {
        a: string;
        b: number;
    }
    type Y = X & {
        c: string;
        d: number;
    }

    ley y: Y = {
        c: 'kush',
        d: 27
    } /* will throw an error because type `Y` also contains attributes of type `X` */

    / extending an interface */
    interface Guy extends Person {
        profession: string;
    }
