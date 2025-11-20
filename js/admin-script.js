// Basic courier state and helper functions for AdminDashboard
// Provides: couriers (array), nextId (number), renderTable(), logout(), addCourier(), and persistence

(function(){
    // Load from localStorage or seed with sample data
    const stored = localStorage.getItem('yash_couriers');
    window.couriers = stored ? JSON.parse(stored) : [
        { id: 'CN-1', sender: 'Reliance Fresh', senderAddress: 'Shop No. 12, Sector 18, Ahmedabad', receiver: 'Rahul Sharma', receiverAddress: 'Plot No. 42, Rajkot', phone: '9999999999', estimatedDelivery: '2025-11-10', status: 'Delivered', date: '2025-11-07' }
    ];

n