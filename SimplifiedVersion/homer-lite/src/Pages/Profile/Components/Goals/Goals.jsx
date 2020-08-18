import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root : {
    textAlign : 'center'
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ControlledOpenSelect() {
  const classes = useStyles();
  const [goal, setGoal] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setGoal(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Goals</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={goal}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'earn_additional_income'}>Earn Additional Income</MenuItem>
          <MenuItem value={'provide_housing_for_people_in_need'}>Provide Housing For People In Need</MenuItem>
          <MenuItem value={'learn_about_real_estate_markets'}>Learn About Real Estate Markets</MenuItem>
          <MenuItem value={'avoid_vacant_home_tax'}>Avoid Vacant Home Tax</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}