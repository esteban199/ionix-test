import 'react-native';
import React from 'react';
import Home from '../app/containers/home/Home';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Home />);
});
