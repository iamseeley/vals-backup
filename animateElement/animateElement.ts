export function animateElement(element, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            element.classList.add('in-view');
            resolve();
        }, delay);
    });
}

export async function animateElementsSimultaneously(elements, initialDelay) {
    const promises = elements.map(element => animateElement(element, initialDelay));
    await Promise.all(promises);
}
