import React, {useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useAlert } from 'react-alert';
import authHeader from '../services/AuthHeader';

const api = axios.create({
  baseURL: `http://localhost:8080/api/images/`,
});

const useStyles = makeStyles(() => ({
  field: {
    marginTop: '20px',
    marginBottom: '20px',
    display: 'block',
  },
  subfield: {
    paddingLeft: '20px',
    display: 'block',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    width: '50vh',
    paddingLeft: '15px',
  },
}));

export default function EditPage() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const alert = useAlert();

  const image = location.state.image;

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const updateUser = async () => {
    const newImage = image
    newImage.name = title

    await api
      .put(`/edit/${image.id}`, newImage, { headers: authHeader() })
      .catch((err) => {
        console.log(err)
        alert.show("Ehhez nincs jogod")
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title === '') {
      setTitleError(true);
      alert.show('Üres a mező ez így nem fog menni!');
    }

    if (title) {
      updateUser().then(() => {
        history.push('/');
        alert.show("Jól átírtuk")
      });
    }
  };

  return (
    <Container>
      <Typography variant="h5" component="h2" color="primary" gutterBottom>
        Edit Image Detail
      </Typography>

      <div className={classes.row}>
        <Typography
          variant="h6"
          component="h2"
          color="primary"
          gutterBottom
          className={classes.field}
        >
          Current Image Name:
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          color="secondary"
          gutterBottom
          className={classes.subfield}
        >
          {image.name}
        </Typography>
      </div>

      <div className={classes.row}>
        <Typography
          variant="h6"
          component="h2"
          color="primary"
          gutterBottom
          className={classes.field}
        >
          Set New Image Name:
        </Typography>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className={classes.form}
        >
          <TextField
            onChange={(event) => setTitle(event.target.value)}
            label="New Image Name"
            variant="outlined"
            fullWidth
            required
            error={titleError}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            endIcon={<KeyboardArrowRightIcon />}
          >
            Submit
          </Button>
        </form>
      </div>

      <img src={image.previewUrl} alt="Logo" />

      <div className={classes.row}>
        <Typography
          variant="h6"
          component="h2"
          color="primary"
          gutterBottom
          className={classes.field}
        >
          Uploaded By:
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          color="secondary"
          gutterBottom
          className={classes.subfield}
        >
          {image.uploadedBy.email}
        </Typography>
      </div>

      <div className={classes.row}>
        <Typography
          variant="h6"
          component="h2"
          color="primary"
          gutterBottom
          className={classes.field}
        >
          Created By:
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          color="secondary"
          gutterBottom
          className={classes.subfield}
        >
          {image.createdBy}
        </Typography>
      </div>

      <div className={classes.row}>
        <Typography
          variant="h6"
          component="h2"
          color="primary"
          gutterBottom
          className={classes.field}
        >
          Created At:
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          color="secondary"
          gutterBottom
          className={classes.subfield}
        >
          {image.createdAt}
        </Typography>
      </div>
    </Container>
  );
}
