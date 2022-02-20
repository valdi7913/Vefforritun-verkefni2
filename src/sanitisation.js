import { body, validationResult } from 'express-validator';
import xss from 'xss';
import { getAttendees, getEvent } from './lib/events.js';
import moment from 'moment';


export const validationMiddleware = [
  body('name')
    .isLength({ min: 1})
    .withMessage('Nafn verður að vera að minnsta kosti 1 stafur'),
  body('name')
    .isLength({ max: 64})
    .withMessage('Nafn verður að vera að hámarki 64 stafir'),
  body('comment')
    .isLength({ max:400 })
    .withMessage('Athugasemd má vera að hámarki 400 stafir'),
];

export const xssSanitationMiddleware = [
  body('name').customSanitizer(value => xss(value)),
  body('comment').customSanitizer(value => xss(value)),
];

export const sanitizationMiddleware = [
  body('name').trim().escape(),
];

export async function validationCheck(req, res, next) {
  const { name, comment, eventId} = req.body;

  const formData = {
    name,
    comment
  };

  const attendees = await getAttendees(eventId);
  const event = await getEvent(eventId);

  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    res.render('event', {
      title: event.name,
      moment: moment,
      event,
      errors: validation.errors,
      attendees
    });
  }
  return next();
}
