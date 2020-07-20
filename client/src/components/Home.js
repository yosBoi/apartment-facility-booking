import React, { useContext } from 'react';
import {AuthContext} from '../context/AuthContext';

import '../styles/css/home.min.css'

const Home = props => {
  const {isAuthenticated, user } = useContext(AuthContext);

  return(
    <div className="home">
      {isAuthenticated ? <h2>Hello, {user}</h2> : null}
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur convallis lacus, venenatis feugiat lorem tempus sed. Ut auctor lorem vitae elit maximus, eget hendrerit diam pulvinar. Nullam nec malesuada neque. Phasellus ornare tellus metus, eu mattis odio mollis vel. Vivamus gravida porttitor enim sed aliquam. Phasellus tristique nec mi in accumsan. Quisque maximus velit nec posuere aliquet. Aliquam fermentum erat non nibh dictum finibus. Etiam in vestibulum tortor. Vestibulum aliquet lacus sapien, eget pellentesque turpis laoreet in. Etiam felis turpis, dignissim eget risus sed, euismod commodo felis. Phasellus pulvinar maximus rutrum. Morbi mollis dapibus aliquam.

Pellentesque imperdiet massa eget felis consectetur vestibulum. Aenean volutpat laoreet blandit. In risus est, bibendum ut purus id, ultrices sollicitudin velit. Phasellus sit amet luctus sapien, tempus ultrices est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sagittis et odio ultrices feugiat. Nam elementum id ante sed mollis.

Nam in neque enim. Nulla sodales, est luctus dapibus ultrices, turpis elit bibendum nunc, eget rhoncus ipsum lacus id lacus. Nulla euismod mi nec imperdiet ultrices. Fusce imperdiet arcu vitae massa elementum varius. Praesent vitae erat sit amet mauris ultrices bibendum eu ac lacus. Etiam eu elit ipsum. Etiam vel sem non ante convallis iaculis a a dolor. Cras facilisis semper mollis. Quisque dui tellus, fringilla non augue eget, tincidunt mattis arcu. Quisque aliquam dictum augue, vel rutrum dui. In tincidunt dui dolor, et blandit ipsum auctor ac. Vestibulum sed libero pellentesque, dictum diam sit amet, congue enim.
      </p>
    </div>
  
  )
}

export default Home;