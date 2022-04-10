export const toCsv = (): void => {
    const tableTitles = Array.from(document.querySelectorAll<HTMLElement>('.titles__table div'))
    .map(item => `"${item.textContent}"`);

    const tableItems = Array.from(document.querySelectorAll<HTMLElement>('.body__table div.tr'))
    .map((item: HTMLElement): void | Array<string> => {
        if (item.classList.contains('active')) {
            return Array.from(item.querySelectorAll<HTMLElement>('div.td')).map(element => `"${element.textContent}"`);
        }
    })
    .filter(Boolean);

    const dataCsv = [tableTitles, ...tableItems] as Array<string[]>;
    let strCsv = '';

    dataCsv.forEach(item => strCsv = strCsv + item.join(',') + '\n');
    const blob: any = new Blob([strCsv], { type: 'text/csv' });
    console.log(typeof blob);
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = 'currencies.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blob);
}