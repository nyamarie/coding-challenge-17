// Task 1 – Customer Class
class Customer {
    constructor(name, email) {
      this.name = name;
      this.email = email;
      this.purchaseHistory = [];
    }
  
    addPurchase(amount) {
      this.purchaseHistory.push(amount);
    }
  
    getTotalSpent() {
      return this.purchaseHistory.reduce((sum, purchase) => sum + purchase, 0);
    }
  }
  // Test Customer
const customer1 = new Customer("Alice Johnson", "alice@example.com");
customer1.addPurchase(120);
customer1.addPurchase(300);
console.log(`${customer1.name} has spent: $${customer1.getTotalSpent()}`);

// Task 2 – SalesRep Class
class SalesRep {
    constructor(name) {
      this.name = name;
      this.clients = [];
    }
  
    addClient(customer) {
      this.clients.push(customer);
    }
  
    getClientTotal(name) {
      const client = this.clients.find(c => c.name === name);
      return client ? client.getTotalSpent() : 0;
    }
  }
  
  // Test SalesRep
  const salesRep = new SalesRep("Jordan Smith");
  salesRep.addClient(customer1);
  console.log(`${salesRep.name}'s client ${customer1.name} has spent: $${salesRep.getClientTotal("Alice Johnson")}`);

  // Task 3 – VIPCustomer Class (Extends Customer)
class VIPCustomer extends Customer {
    constructor(name, email, vipLevel) {
      super(name, email);
      this.vipLevel = vipLevel;
    }
  
    getTotalSpent() {
      const baseTotal = super.getTotalSpent();
      return baseTotal * 1.10; // 10% bonus
    }
  }
  
  // Test VIPCustomer
  const vipCustomer = new VIPCustomer("Bob Taylor", "bob@example.com", "Platinum");
  vipCustomer.addPurchase(200);
  vipCustomer.addPurchase(450);
  console.log(`${vipCustomer.name} (VIP: ${vipCustomer.vipLevel}) has spent with bonus: $${vipCustomer.getTotalSpent().toFixed(2)}`);

  // Task 4 – Client Reporting
const customer2 = new Customer("Clara Daniels", "clara@example.com");
customer2.addPurchase(250);
customer2.addPurchase(100);

const customer3 = new VIPCustomer("Diana King", "diana@example.com", "Gold");
customer3.addPurchase(600);

salesRep.addClient(customer2);
salesRep.addClient(vipCustomer);
salesRep.addClient(customer3);

const allClients = salesRep.clients;

// Total revenue
const totalRevenue = allClients.reduce((sum, client) => sum + client.getTotalSpent(), 0);
console.log(`💰 Total Revenue from all clients: $${totalRevenue.toFixed(2)}`);

// Customers who spent more than $500
const highSpenders = allClients.filter(client => client.getTotalSpent() > 500);
console.log(`🔥 High-Spending Clients:`);
highSpenders.forEach(client => {
  console.log(`- ${client.name}: $${client.getTotalSpent().toFixed(2)}`);
});

// Customer summary: name + total spent
const summary = allClients.map(client => ({
  name: client.name,
  total: client.getTotalSpent().toFixed(2)
}));
console.log("📋 Customer Summary:");
console.table(summary);