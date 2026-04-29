(() => {
    const display   = document.getElementById('result');
    const exprEl    = document.getElementById('expression');
    const buttons   = document.querySelectorAll('.btn');

    let current     = '0';   // number being typed
    let previous    = null;  // previous operand
    let operator    = null;  // pending operator
    let justEvaled  = false; // did we just press =?

    // ── Helpers ──────────────────────────────────────────────
    const format = (num) => {
        const n = parseFloat(num);
        if (isNaN(n)) return 'Error';
        // Use toPrecision to avoid float junk, then strip trailing zeros
        let str = parseFloat(n.toPrecision(10)).toString();
        // Add thousand-separators for display (integers only)
        if (!str.includes('.') && !str.includes('e')) {
            str = Number(str).toLocaleString('en-US');
        }
        return str;
    };

    const setDisplay = (val) => {
        display.textContent = format(val);
        // Shrink font if number is long
        const len = display.textContent.length;
        display.style.fontSize = len > 12 ? '28px' : len > 9 ? '36px' : '48px';
    };

    const flash = () => {
        display.classList.add('flash');
        setTimeout(() => display.classList.remove('flash'), 100);
    };

    const clearActiveOp = () => {
        document.querySelectorAll('.btn.op').forEach(b => b.classList.remove('active-op'));
    };

    const markActiveOp = (op) => {
        clearActiveOp();
        document.querySelectorAll('[data-action="operator"]').forEach(b => {
            if (b.dataset.value === op) b.classList.add('active-op');
        });
    };

    // ── Core calculation ─────────────────────────────────────
    const calculate = (a, b, op) => {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case '+': return a + b;
            case '−': return a - b;
            case '×': return a * b;
            case '÷': return b === 0 ? 'Error' : a / b;
        }
    };

    // ── Actions ───────────────────────────────────────────────
    const actions = {
        number(val) {
            if (justEvaled) { current = val; justEvaled = false; }
            else current = current === '0' ? val : current + val;
            setDisplay(current);
        },

        decimal() {
            if (justEvaled) { current = '0.'; justEvaled = false; }
            else if (!current.includes('.')) current += '.';
            display.textContent = current; // raw, no formatting mid-entry
        },

        operator(val) {
            clearActiveOp();
            markActiveOp(val);

            if (previous !== null && !justEvaled) {
                const res = calculate(previous, current, operator);
                flash();
                previous = String(res);
                setDisplay(previous);
                exprEl.textContent = `${format(previous)} ${val}`;
            } else {
                previous = current;
                exprEl.textContent = `${format(current)} ${val}`;
            }
            operator  = val;
            justEvaled = false;
            current   = '0';
        },

        equals() {
            if (operator === null || previous === null) return;
            const expr = `${format(previous)} ${operator} ${format(current)} =`;
            const res  = calculate(previous, current, operator);
            flash();
            clearActiveOp();
            exprEl.textContent = expr;
            current    = String(res);
            previous   = null;
            operator   = null;
            justEvaled = true;
            setDisplay(current);
        },

        clear() {
            current    = '0';
            previous   = null;
            operator   = null;
            justEvaled = false;
            clearActiveOp();
            exprEl.textContent = '';
            setDisplay('0');
        },

        sign() {
            current = String(parseFloat(current) * -1);
            setDisplay(current);
        },

        percent() {
            current = String(parseFloat(current) / 100);
            setDisplay(current);
        }
    };

    // ── Event listeners ───────────────────────────────────────
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const { action, value } = btn.dataset;
            if (actions[action]) actions[action](value);
        });
    });

    // ── Keyboard support ──────────────────────────────────────
    document.addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9') actions.number(e.key);
        else if (e.key === '.') actions.decimal();
        else if (e.key === '+') actions.operator('+');
        else if (e.key === '-') actions.operator('−');
        else if (e.key === '*') actions.operator('×');
        else if (e.key === '/') { e.preventDefault(); actions.operator('÷'); }
        else if (e.key === 'Enter' || e.key === '=') actions.equals();
        else if (e.key === 'Escape') actions.clear();
        else if (e.key === 'Backspace') {
            if (current.length > 1) current = current.slice(0, -1);
            else current = '0';
            setDisplay(current);
        }
    });

    // Init
    setDisplay('0');
})();