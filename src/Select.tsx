import React from 'react';
import {
    FormControl,
    InputLabel,
    Select as MultiSelect,
    MenuItem,
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
    select: {
        width: '6em',
    },
});

type Value = string | number | { value: number; text: string };

interface SelectProps {
    label: string;
    onChange: (value: any) => void;
    value?: string | number;
    options: Value[];
}

const Select = ({ label, onChange, value, options }: SelectProps) => {
    const classes = useStyles();

    const onSelectChange = (event: React.ChangeEvent<{ value: any }>) => {
        onChange(event.target.value);
    };

    return (
        <FormControl variant="filled" className={classes.select}>
            <InputLabel>{label}</InputLabel>
            <MultiSelect onChange={onSelectChange} value={value}>
                {options.map((option) => {
                    let optionValue = null;
                    let text = null;
                    if (typeof option === 'string' || typeof option === 'number') {
                        optionValue = option;
                        text = option;
                    } else {
                        optionValue = option.value;
                        text = option.text || option.value;
                    }
                    return (
                        <MenuItem key={optionValue} value={optionValue}>
                            {text || optionValue}
                        </MenuItem>
                    );
                })}
            </MultiSelect>
        </FormControl>
    );
};

export default Select;
