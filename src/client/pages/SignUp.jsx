import React from 'react';

export default () => <form id="signup" name="signup" method="post" action="/signup">
  <label htmlFor="email">Email Address</label>
  <input className="text" name="email" type="email" />
  <label htmlFor="firstname">Firstname</label>
  <input className="firstname" type="text" />
  <label htmlFor="lastname">Lastname</label>
  <input className="lastname" type="text" />
  <label htmlFor="password">Password</label>
  <input className="password" type="password" />
  <br/>
  <label htmlFor="type">What's your role?</label>
  <select>
   <option value="hacker">Hacker</option>
   <option value="sponsor">Sponsor</option>
   <option value="volunteer">Volunteer</option>
   <option value="judge">Judge</option>
  </select>
  <input name="file" type="file" />
  <input className="btn" type="submit" value="Sign Up" />
</form>;
