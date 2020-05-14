import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faCog,
  faDoorOpen,
  faSyncAlt,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import {
  faEye,
  faEyeSlash,
  faTrashAlt,
  faPlus,
  faFileArchive,
  faLock,
  faUnlock,
  faRulerVertical,
  faCaretUp,
  faCaretDown
} from '@fortawesome/free-solid-svg-icons';

function useFA() {
  library.add(
    faHome,
    faCog,
    faDoorOpen,
    faSyncAlt,
    faCalendarAlt,
    faEye,
    faEyeSlash,
    faTrashAlt,
    faPlus,
    faFileArchive,
    faLock,
    faUnlock,
    faRulerVertical,
    faCaretUp,
    faCaretDown
  );
  return null;
}

export default useFA;
