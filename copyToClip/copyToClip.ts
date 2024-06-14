export function copyToClip(elementId) {
    const element = document.querySelector(`#${elementId}`);
    if (element) {
        const text = element.innerText;
        console.log('Text to copy:', text);

        if (text.trim()) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Text copied to clipboard');
            }).catch(err => {
                console.error('Could not copy text: ', err);
            });
        } else {
            console.error('No text to copy');
        }
    } else {
        console.error(`#${elementId} element not found`);
    }
}
