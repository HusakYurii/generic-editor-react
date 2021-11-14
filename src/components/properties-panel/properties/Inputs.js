export const TextInput = ({ value, onChange }) => {
    return (
        <>
            <div>
                <input
                    type="text"
                    value={value}
                    onInput={(e) => onChange(e.target.value)}
                ></input>
            </div>
        </>
    );
};

export const NumberInput = (props) => {
    const { value, placeholder, onChange, max = 10000, min = -10000, step = 1 } = props;
    return (
        <>
            <div placeholder={placeholder}>
                <input
                    type="number"
                    value={value}
                    max={max}
                    min={min}
                    step={step}
                    onInput={(e) => onChange(e.target.value)}
                ></input>
            </div>
        </>
    );
};