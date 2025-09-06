
export default function percentageCalc(value, total) {
  
    if (total === 0) return 0
    return ((value / total) * 100).toFixed()

}
