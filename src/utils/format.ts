const EuroNumberFormat = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'EUR',
})

export function formatCurrency(value: number) {
    return EuroNumberFormat.format(value)
}