import moment from 'moment';
import express from 'express';
import { catchErrors } from '../lib/catch-errors.js';
import { listEvents, getEvent, addToEvent, getAttendees } from '../lib/events.js';
import {
  sanitizationMiddleware,
  xssSanitationMiddleware,
  validationMiddleware,
  validationCheck } from '../sanitisation.js'

export const indexRouter = express.Router();

async function indexRoute(req, res) {
  const events = await listEvents();
  const formData = {
    name: 'Viðburðasíðan',
  };
  res.render('index', {
    formData,
    events,
  });
}

async function eventRoute(req, res) {
  const errors = [];
  const { id } = req.params;
  console.log('id :>> ', id);
  let event = { name: '', comment: '', attendees: [] };
  let attendees = [];

  const foo = await getEvent(id);
  const bar = await getAttendees(id);

  if(foo !== null) {
    event = foo;
    attendees = bar;
  }
  res.render('event', {
    title: event.name,
    moment: moment,
    event,
    errors,
    attendees
  });
}

async function signUp(req, res) {
  const {eventId, name, comment} = req.body;
  console.log('name, eventId, comment :>> ', name, eventId, comment);
  let success = true;
  try {
    success = await addToEvent(name, eventId, comment);
  } catch (e) {
    console.error(e);
  }
  if(success) {
    console.log(`redirecting to /events/${eventId}`);
    res.redirect('/events/' + eventId);
  }
  res.render('error', {title: 'Gat ekki skráð', text: 'Hefur þú nú þegar skráð þig inn?'});
}

indexRouter.get('/', catchErrors(indexRoute));
indexRouter.get('/events/:id', catchErrors(eventRoute));
indexRouter.post('/comment',
          validationMiddleware,
          xssSanitationMiddleware,
          catchErrors(validationCheck),
          sanitizationMiddleware,
          catchErrors(signUp));
