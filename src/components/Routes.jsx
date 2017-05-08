import React from 'react';
import { Route } from 'react-router-dom';

import CamApp from './CamApp';

const About = () => <h1 className="about">This is the about page</h1>;
const Terms = () => <h1 className="terms">This is the terms page</h1>;
const CookiePolicy = () => <h1 className="cookie-policy">This is the cookie policy page</h1>;
const Jobs = () => <h1 className="jobs">This is the jobs page</h1>;
const Contact = () => <h1 className="contact">This is the contact page</h1>;
const Models = () => <h1 className="models">This is the models page</h1>;
const Help = () => <h1 className="help">This is the help page</h1>;
const User = () => <h1 className="help">This is a user page</h1>;

export default function Routes() {
  return (
    <div>
      <Route exact path="/" component={CamApp} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/cookiepolicy" component={CookiePolicy} />
      <Route path="/terms" component={Terms} />
      <Route path="/models" component={Models} />
      <Route path="/help" component={Help} />
      <Route path="/:id" component={User} />
    </div>
  );
}
