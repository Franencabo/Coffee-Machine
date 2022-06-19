const input = require('sync-input');
const coffeeTypes = [
    {name: 'espresso', water: 250, milk: 0, coffee: 16, price: 4},
    {name: 'latte', water: 350, milk: 75, coffee: 20, price: 7},
    {name: 'cappuccino', water: 200, milk: 100, coffee: 12, price: 6}
];


let coffeeMachine = {
    money: 550,
    water: 400,
    milk: 540,
    coffee: 120,
    disposableCups: 9,
    fillSupplies() {
        this.water += Number(input(`Write how many mll of water do you want to add:`));
        this.milk += Number(input(`Write how many ml of milk you want to add:`));
        this.coffee += Number(input(`Write how many grams of coffee beans you want to add:`));
        this.disposableCups += Number(input(`Write how many disposable coffee cups you want to add:`));
    },
    state() {
        console.log(`The coffee machine has:
        ${this.water} ml of water
        ${this.milk} ml of milk
        ${this.coffee} g of coffee beans
        ${this.disposableCups} disposable cups
        ${this.money} of money`);
    },
    makeCoffee() {
        let userChoice = Number(input(`What do you want to buy? 1 - espresso, 2 - latte, 3 -cappuccino, back - to main menu:`));
        if(!isNaN(userChoice)) {
            if(this.checkAvailability(userChoice)) {
                this.water = Math.max(this.water - coffeeTypes[userChoice - 1].water, 0);
                this.milk = Math.max(this.milk - coffeeTypes[userChoice - 1].milk, 0);
                this.coffee = Math.max(this.coffee - coffeeTypes[userChoice - 1].coffee, 0);
                this.disposableCups = Math.max(this.disposableCups - 1, 0);
                this.money += coffeeTypes[userChoice - 1].price;
            }
        } else if (userChoice === `back`){
            this.work();
        }
    },
    checkAvailability(index) {
        if(this.disposableCups > 0) {
            let availableCupsWithWater = this.water/coffeeTypes[index - 1].water;
            let availableCupsWithMilk = this.milk/coffeeTypes[index - 1].milk;
            let availableCupsWithCoffee = this.coffee/coffeeTypes[index - 1].coffee;

            let availableAmountOfCups = Math.floor(Math.min(availableCupsWithWater, availableCupsWithMilk, availableCupsWithCoffee));

            switch (true) {
                case availableAmountOfCups >=1 && this.disposableCups >=1:
                    console.log(`I have enough resources, making you a coffee!`);
                    return true;
                case availableAmountOfCups < 1:
                    switch (true){
                        case availableCupsWithWater < 1:
                            console.log("Sorry, not enough water!");
                            break;
                        case availableCupsWithMilk < 1:
                            console.log("Sorry, not enough milk!");
                            break;
                        case availableCupsWithCoffee < 1:
                            console.log("Sorry, not enough coffee beans!");
                            break;
                        case this.disposableCups < 1:
                            console.log("Sorry, not enough coffeecups!");
                            break;
                    }
                    return false;
            }

        }
    },
    giveMoney() {
        console.log(`I gave you $${this.money}`);
        this.money -= this.money;
    },
    work(){
        let userAction = input(`Write action (buy, fill, take, remaining, exit):`);


        while (userAction !== 'exit') {
            switch (userAction){
                case 'buy':
                    coffeeMachine.makeCoffee();
                    break;
                case 'fill':
                    coffeeMachine.fillSupplies();
                    break;
                case 'take':
                    coffeeMachine.giveMoney();
                    break;
                case 'remaining':
                    coffeeMachine.state();
                    break;
            }
            userAction = input(`Write action (buy, fill, take, remaining, exit):`);
        }

    }
}


coffeeMachine.work();

