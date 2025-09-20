import {sum} from "../sum"

test("Sum function should calculate sum of two numbers", ()=>{

    const result = sum(10,20);

    //Assertion
    expect(result).toBe(30);

})