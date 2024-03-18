const sortPoints = require( "../sortPoints" ) ; 

test( "The input is not sorted. " , function () { 
    var inputList = [ 
        { x: 2 , y: 10 } , 
        { x : 1 , y : 12 } 
    ] ; 
    var outputList = [ 
        { x : 1 , y : 12 } , 
        { x: 2 , y: 10 } 
    ] ; 
    expect( sortPoints( inputList ) ).toStrictEqual( outputList ) ; 
}) ; 

test("The input list is an empty list. ", () => {
  const inputList = [];
  const outputList = [];
  expect( sortPoints( inputList ) ).toStrictEqual( outputList ) ; 
});

test("The input list is already sorted. ", () => {
  const inputList = [
    { x: 1, y: 5 },
    { x: 2, y: 10 },
    { x: 3, y: 15 }
  ];
  const outputList = [
    { x: 1, y: 5 },
    { x: 2, y: 10 },
    { x: 3, y: 15 }
  ];
  expect( sortPoints( inputList ) ).toStrictEqual( outputList ) ; 
}); 

test("The input list contain multiple points with the same X value. ", () => {
  const inputList = [
    { x: 2, y: 10 },
    { x: 1, y: 12 },
    { x: 3, y: 8 },
    { x: 1, y: 14 }
  ];
  const outputList = [
    { x: 1, y: 12 },
    { x: 1, y: 14 },
    { x: 2, y: 10 },
    { x: 3, y: 8 }
  ];
  expect(sortPoints( inputList ) ).toStrictEqual( outputList ) ; 
});

test("The sort operation is in-place, the input and the output has the same reference. ", () => {
  const inputList = [
    { x: 2, y: 10 },
    { x: 1, y: 12 }
  ];
  const outputList = [
    { x: 1, y: 12 },
    { x: 2, y: 10 }
  ];
  const sortedList = sortPoints( inputList ) ; 
  expect( sortedList ).toStrictEqual( outputList ) ; 
  expect( sortedList ).toBe( inputList ) ; // Check if it's the same reference. 
});

test("The input has 10+ points. ", () => {
  const inputList = [
    { x: 5, y: 10 },
    { x: 2, y: 12 },
    { x: 8, y: 14 },
    { x: 1, y: 16 },
    { x: 3, y: 18 },
    { x: 7, y: 20 },
    { x: 6, y: 22 },
    { x: 4, y: 24 },
    { x: 9, y: 26 },
    { x: 10, y: 28 }
  ];
  const outputList = [
    { x: 1, y: 16 },
    { x: 2, y: 12 },
    { x: 3, y: 18 },
    { x: 4, y: 24 },
    { x: 5, y: 10 },
    { x: 6, y: 22 },
    { x: 7, y: 20 },
    { x: 8, y: 14 },
    { x: 9, y: 26 },
    { x: 10, y: 28 }
  ];
  expect( sortPoints( inputList ) ).toStrictEqual( outputList ) ; 
}); 

