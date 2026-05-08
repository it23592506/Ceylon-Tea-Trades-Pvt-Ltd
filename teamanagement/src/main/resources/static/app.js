// Populate Supplier Dropdown
fetch('/api/suppliers')
  .then(res => res.json())
  .then(suppliers => {
    const supplierSelect = document.getElementById('supplierId');
    suppliers.forEach(supplier => {
      const option = document.createElement('option');
      option.value = supplier.supplierId;
      option.textContent = supplier.name;
      supplierSelect.appendChild(option);
    });
  });

// Add Supplier
document.getElementById('supplierForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('supplierName').value;
  const contact = document.getElementById('supplierContact').value;
  const address = document.getElementById('supplierAddress').value;

  fetch('/api/suppliers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, contactInfo: contact, address })
  }).then(response => {
    if (response.ok) {
      alert('Supplier added successfully!');
      location.reload(); // reload page to update supplier list
    }
  });
});

// Add Inventory
document.getElementById('inventoryForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const productName = document.getElementById('productName').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const restockLevel = parseInt(document.getElementById('restockLevel').value);
  const supplierId = document.getElementById('supplierId').value;

  fetch('/api/inventory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productName,
      quantity,
      restockLevel,
      supplier: { supplierId }
    })
  }).then(response => {
    if (response.ok) {
      alert('Inventory item added successfully!');
      location.reload(); // reload page to update inventory list
    }
  });
});

// Load Inventory Table
fetch('/api/inventory')
  .then(res => res.json())
  .then(items => {
    const tbody = document.querySelector('#inventoryTable tbody');
    items.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.productName}</td>
        <td>${item.quantity}</td>
        <td>${item.restockLevel}</td>
        <td>${item.supplier ? item.supplier.name : 'N/A'}</td>
      `;
      tbody.appendChild(row);
    });
  });
