/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Element{
    constructor(name, buildYear){
        this.name = name;
        this.buildYear = buildYear
    }
}

class Parks extends Element{
    constructor(name, buildYear, treeNum, area){
        super(name, buildYear);
        this.treeNum = treeNum;
        this.area = area;
    }

    treeDensity(){
        const treeDensity = formattingNum(Math.round(this.treeNum / this.area));
        console.log(`The ${this.name}'s tree density is ${treeDensity}.`);
    }
}

class Streets extends Element{
    constructor(name, buildYear, length, size = 3){
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

    classification(){
        const classifyStreet = new Map();
        classifyStreet.set(1, 'tiny');
        classifyStreet.set(2, 'small');
        classifyStreet.set(3, 'normal');
        classifyStreet.set(4, 'big');
        classifyStreet.set(5, 'huge');
        console.log(`The ${this.name}'s length is ${this.length}km so this street is very ${classifyStreet.get(this.size)} street.`);
    }
}

const formattingNum = (num)=>{
let splitNum, curNum, decNum; 
num = Math.abs(num);
num = num.toFixed(2);
splitNum = num.split('.');
curNum = splitNum[0];
if(curNum.length > 3){
    curNum = curNum.substr(0, curNum.length - 3) + ',' + curNum.substr(curNum.length - 3, curNum.length);
}
decNum = splitNum[1];
return curNum + '.' + decNum;
}

const calculateAverATotal = (arr)=>{
    let sum = arr.reduce((acc, cur)=>acc + cur);
    return [formattingNum(Math.round(sum)), formattingNum(Math.round(sum / arr.length))];
}

const park = [new Parks('GreenPark', 1987, 215, 0.20), new Parks('National park', 1894, 3541, 2.90), new Parks('Oak park', 1953, 949, 0.40)];

const parksReport = (p)=>{
console.log(`------Parks Report------`)
//Tree Density for each park
p.forEach(cur=>cur.treeDensity());
//average age for all park
let age = p.map(cur => new Date().getFullYear() - cur.buildYear);
let [totalAge, averageAge] = calculateAverATotal(age);
console.log(`The average age for ${p.length} parks is ${averageAge} years.`)
//the name of the park that has more than 1000 tree.
let i = p.map(cur => cur.treeNum).findIndex(cur => cur > 1000);
console.log(`The ${p[i].name} has more than ${formattingNum(1000)} tree.`)
}

parksReport(park);

const street = [new Streets('Ocean street', 1999, 1.1, 2), new Streets('Every green street', 2008, 2.70, 5), new Streets('4th street', 2015, 0.80), new Streets('sunset boulevard street', 1982, 2.50, 4)];

const streetReport = (s)=>{
    console.log(`------Streets Report------`)    
// total average length of town's streets
let [totalLength, averageLength] = calculateAverATotal(s.map(cur => cur.length));
console.log(`The total and average length for town's streets is ${totalLength}km and ${averageLength}km.`)
//size classification of each street
s.forEach(cur => cur.classification());
}

streetReport(street);





