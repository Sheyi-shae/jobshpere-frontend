//international currency -naira format
export function formatCurrency(value) {
//   if (typeof value !== 'number') {
//     return '';
//   }
  
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
  
}

export function extractMonthShort(dateString) {
  const date = new Date(dateString);
   const month = date.toLocaleString("default", { month: "short" }); // Jan, Feb, ...
 
  return`${month} `; 
}


