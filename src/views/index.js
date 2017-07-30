'use strict';

import boardConfig from '../config/board_config';
import MainView from './main_view';

const viewContainer = document.getElementById('calculator');
const viewComponent = new MainView(viewContainer, boardConfig);

viewComponent.init();
