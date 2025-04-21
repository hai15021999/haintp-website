import { Observable } from "rxjs";

/**
 * @see https://www.paulsblog.dev/advanced-javascript-functions-to-improve-code-quality/#debounce
 * @description A debounce function is a method for preventing a quick series of events from repeatedly activating a function. It works by postponing function execution until a certain period has passed without the event being fired. The Debounce function is a useful solution that could be applied in real-world applications to increase performance by preventing the execution of functions if a user is rapidly clicking the buttons.
 * @param {Function} func
 * @param {number} delay 
 * @returns {Function}
 */
export function debounce(func: Function, delay: number) {
    let timeout: any;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    }
}

/**
 * @see https://www.paulsblog.dev/advanced-javascript-functions-to-improve-code-quality/#throttle
 * @description The Throttle function is similar to the Debounce function but with slightly different behavior. Instead of limiting the rate at which the function is called, the Throttle function limits the rate at which the function is executed. This means it will forbid executing if the function was invoked before within a given period. It guarantees that a certain function runs at a consistent rate and won't be triggered too often.
 * @param func 
 * @param delay 
 * @param {Function} func
 * @param {number} delay 
 * @returns {Function}
 */
export function throttle(func: Function, delay: number) {
    let wait = false;
    return (...args: Array<unknown>) => {
        if (wait) {
            return;
        }
        func(...args);
        wait = true;
        setTimeout(() => {
            wait = false;
        }, delay);
    }
}

/**
 * @see https://www.paulsblog.dev/advanced-javascript-functions-to-improve-code-quality/#once
 * @description The Once function is a method that will prevent executing if already called. This is especially useful while working with event listeners, where you often encounter functions that only should run once. Instead of removing event listeners every time you can use the Once function in JavaScript.
 * @param {Function} func
 * @returns {Function}
 */
export function once(func: Function) {
    let ran = false;
    let result: any;
    return function () {
        if (ran) {
            return result;
        }
        result = func.apply(this, arguments);
        ran = true;
        return result;
    }
}

/**
 * @see https://www.paulsblog.dev/advanced-javascript-functions-to-improve-code-quality/#memoize
 * @description Memoize is a JavaScript function, that is used to cache the results of a given function to prevent calling computationally expensive routines multiple times with the same arguments.
 * @param {Function} func 
 * @returns {Function}
 */
export function memoize(func: Function) {
    const cache = new Map();
    return function () {
        const key = JSON.stringify(arguments);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = func.apply(this, arguments);
        cache.set(key, result);
        return result;
    }
}

/**
 * @see https://www.paulsblog.dev/advanced-javascript-functions-to-improve-code-quality/#curry
 * @description The Curry function (also known as Currying) is an advanced JavaScript function used to create a new function from an existing one by "pre-filling" some of its arguments. Currying is often used when working with functions that take multiple arguments and transform them into functions that take some arguments because the other will always stay the same.
 * @param {Function} func 
 * @param {number} arity 
 * @returns {Function}
 */
export function curry(func: Function, arity = func.length) {
    return function curried(...args: Array<unknown>) {
        if (args.length >= arity) {
            return func(...args);
        }
        return function (...moreArgs: Array<unknown>) {
            return curried(...args, ...moreArgs);
        }
    }
}

/**
 * @see https://www.paulsblog.dev/advanced-javascript-functions-to-improve-code-quality/#partial
 * @description The Partial function in JavaScript is similar to the Curry function. The significant difference between Curry and Partial is that a call to a Partial function returns the result instantly instead of returning another function down the currying chain.
 * @param {Function} func 
 * @param {Array<T>} args 
 * @returns {Function}
 */
export function partial(func: Function, ...args: Array<unknown>) {
    return function partiallyApplied(...moreArgs: Array<unknown>) {
        return func(...args, ...moreArgs);
    }
}

/**
 * @see https://www.paulsblog.dev/advanced-javascript-functions-to-improve-code-quality/#pipe
 * @description The Pipe function is a utility function used to chain multiple functions and pass the output of one to the next one in the chain. It is similar to the Unix pipe operator and will apply all functions left-to-right by using the JavaScript reduce() function:
 * @param {Array<Function>} funcs 
 * @returns  {Function}
 */
export function pipe(...funcs: Array<Function>) {
    return function piped(...args: Array<unknown>) {
        return funcs.reduce((result, func) => [func.call(this, ...result)], args)[0];
    }
}

/**
 * @see https://www.paulsblog.dev/advanced-javascript-functions-to-improve-code-quality/#compose
 * @description The Compose function is the same as the Pipe function, but it will use reduceRight to apply all functions
 * @param Array<Function> funcs 
 * @returns {Function}
 */
export function compose(...funcs: Array<Function>) {
    return function composed(...args: Array<unknown>) {
        return funcs.reduceRight((result, func) => [func.call(this, ...result)], args)[0];
    }
}

/**
 * @see https://www.paulsblog.dev/advanced-javascript-functions-to-improve-code-quality/#pick
 * @description The Pick function in JavaScript is used to select specific values from an object. It is a way to create a new object by selecting certain properties from a provided project. It is a functional programming technique that allows extracting a subset of properties from any object if the properties are available.
 * @param {*} obj 
 * @param {} keys 
 * @returns {*}
 */
export function pick(obj: any, keys: Array<string>) {
    return keys.reduce((acc, key) => {
        if (obj.hasOwnProperty(key)) {
            acc[key] = obj[key];
        }
        return acc;
    }, {} as any);
}

/**
 * @see https://www.paulsblog.dev/advanced-javascript-functions-to-improve-code-quality/#omit
 * @description The Omit function is the opposite of the Pick function, as it will remove certain properties from an existing object. This means you can avoid over-fetching by hiding properties. It can be used as a replacement for the Pick function if the amount of properties to hide is smaller than the number of properties to pick.
 * @param {*} obj 
 * @param {Array<string>} keys 
 * @returns {*}
 */
export function omit(obj: any, keys: Array<string>) {
    return Object.keys(obj)
        .filter(key => !keys.includes(key))
        .reduce((acc, key) => {
            acc[key] = obj[key];
            return acc;
        }, {} as any);
}

/**
 * @see https://www.paulsblog.dev/advanced-javascript-functions-to-improve-code-quality/#zip
 * @description The Zip function is a JavaScript function that matches each passed array of elements to another array element and is used to combine multiple arrays into a single array of tuples. The resulting array will contain the corresponding elements from each array. Often, this functionality is used when working with data from multiple sources that need to be merged or correlated in some way.
 * @param {Array<*>} arrays 
 * @returns {Array<Array<*>>}
 */
export function zip(...arrays: Array<any>) {
    const maxLength = Math.max(...arrays.map(array => array.length));
    return Array.from({ length: maxLength }).map((_, i) => {
        return Array.from({ length: arrays.length }, (_, j) => arrays[j][i]);
    });
}

// /**
//  * @description showFavLoading(new Promise((resolve) => setTimeout(resolve, 2000)));
//  * @param {Promise} promise
//  * @returns {*}
//  */
// export function showFavLoading(promise: Promise<any>) {
//     navigation.addEventListener('navigate', (event: any) => {
//         event.intercept({
//             scroll: 'manual',
//             handler: () => promise
//         }, { once: true });
//     });
//     return navigation.navigate(location.href).finished;
// }

/**
   * @name generateUUID
   * @description Generates a GUID-like string, used in OData HTTP batches.
   * @returns {string} - A GUID-like string.
   */
export function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid;
};

/**
 * @description Generates a GUID string using version 7.
 * @returns {string} A GUID string
 */
export function generateUUIDv7() {
    const value = new Uint8Array(16);
    crypto.getRandomValues(value);
    const timestamp = BigInt(Date.now());

    value[0] = Number((timestamp >> 40n) & 0xffn);
    value[1] = Number((timestamp >> 32n) & 0xffn);
    value[2] = Number((timestamp >> 24n) & 0xffn);
    value[3] = Number((timestamp >> 16n) & 0xffn);
    value[4] = Number((timestamp >> 8n) & 0xffn);
    value[5] = Number(timestamp & 0xffn);

    value[6] = (value[6] & 0x0f) | 0x70;
    value[8] = (value[8] & 0x3f) | 0x80;

    return Array.from(value).map(b => b.toString(16).padStart(2, "0")).join("");
}

export function roundFileSize(sizeInByte: string) {
    if (sizeInByte === null || sizeInByte === undefined || sizeInByte === '') {
        return '';
    }
    const byte = Number(sizeInByte);
    const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'HB', 'ZB'];

    const calc = unit.reduce((acc, cur, index, array) => {
        if (acc.size >= 1000) {
            acc.size = acc.size / 1024;
            acc.unit = array[index + 1] ?? 'ZB';
        }
        return acc;
    }, { size: byte, unit: 'B' });

    return `${Number(calc.size.toFixed(2))} ${calc.unit}`
}

/**
 * @see https://techcommunity.microsoft.com/t5/sharepoint/what-is-f-r-in-shared-urls/m-p/234117
 * @description convert raw url to server related url
 * @param {string} domain 
 * @returns {string}
 */
export function getSharePointPathUrl(domain: string) {
    /**
     * :f: folder
     * :w: word
     * :x: excel
     * :p: pdf
     * :b: power point
     * :i: image
     * :t: text file
     * :v: video
     * :o: one note
     * :u: other file
     * ============
     * r: read only
     * e: edit
     * s: share or site
     */
    const pattern = /(:[fwxpbitvuo]:\/[ers])/;
    if (pattern.exec(domain) !== null) {
        const symbol = pattern.exec(domain)[0];
        const parserDomain = domain.replace(symbol, 'sites').split('/').reduce((acc, cur, index) => {
            if (index < 5) {
                acc.push(cur);
            }
            return acc;
        }, []).join('/');
        return parserDomain;
    }
    if (domain.indexOf('/_layouts') > -1) {
        return domain.split('/_layouts')[0];
    }
    if (domain.indexOf('.aspx') > -1) {
        const arrPath = domain.split('.aspx')[0].split('/');
        arrPath.pop();
        return arrPath.join('/');
    }
    if (domain[domain.length - 1] === '/') {
        const path = domain.slice(0, -1);
        return path;
    }
    return domain;

}

export function djb2Hash(value: string = "") {
    let hash = 5381; // Initial hash value
    for (let i = 0; i < value.length; i++) {
        hash = (hash * 33) ^ value.charCodeAt(i); // Multiply by 33 and XOR with the next character's ASCII value
    }
    return hash >>> 0; // Ensure hash is a 32-bit unsigned integer
}

export function logError(error: string) {
    readLogFileContent$().subscribe((content) => {
        const newContent = `${content}\r\n${new Date().toLocaleString()} - ${error}\r\n`;
        writeLogFileContent$(newContent).subscribe();
    });
}

function readLogFileContent$() {
    return new Observable((observer) => {
        const defaultContent = `*** eXsync Log File ***\r\n========================\r\n\r\n`;
        observer.next(defaultContent);
        observer.complete();
    })
}

function writeLogFileContent$(content: string) {
    return new Observable((observer) => {
        // console.log(content);
        observer.next(true);
        observer.complete();
    })
}

/**
 * Convert html string to plain text
 * Remove all value of image and link tag
 * @param {string} html html string
 * @returns {string} plain text
 */
export function htmlToPlainText(html: string) {
    const dom = new DOMParser().parseFromString(html, 'text/html');
    const text = dom.body.textContent || "";
    return text;

    // use regex to remove all value of image and link tag
    // const text = html.replace(/<img[^>]*>/g, '').replace(/<a[^>]*>/g, '');
    // return text.replace(/<[^>]*>/g, '');
}
