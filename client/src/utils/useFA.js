import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faCog,
  faDoorOpen,
  faSyncAlt,
  faCalendarAlt,
  faUser,
  faEye,
  faEyeSlash,
  faTrashAlt,
  faPlus,
  faFileArchive,
  faLock,
  faUnlock,
  faRulerVertical,
  faCaretUp,
  faCaretDown,
  faCompactDisc,
  faFileAudio,
  faInfo,
  faArrowUp,
  faArrowLeft,
  faLongArrowAltUp,
  faLongArrowAltLeft
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
    faCaretDown,
    faUser,
    faCompactDisc,
    faFileAudio,
    faInfo,
    faArrowLeft,
    faArrowUp,
    faLongArrowAltUp,
    faLongArrowAltLeft
  );
  return null;
}

export default useFA;
