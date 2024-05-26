export interface Language {
  copy: string;
  welcome: string;
  menu: Menu;
  actions_buttons: ActionsButtons;
  drawers: Drawers;
  labels_form: LabelsForm;
  rules: Rules;
  tooltips: Tooltips;
  placeHolders: PlaceHolders;
  titles: Titles;
  popsconfirm: Popsconfirm;
  responsesAPI: ResponsesAPI;
}

export interface ResponsesAPI {
  err_get_rollouts: string;
  succes_create_rollout: string;
  add_full_rollout: string;
  remove_full_rollout: string;
  err_add_full_rollout: string;
  err_remove_full_rollout: string;
  update_status: string;
  update_user: string;
  remove_user: string;
}

type PopConfirmStruct = {
  title: string;
  description: string;
};

export interface Popsconfirm {
  full_rollout: {
    title: string;
    description: string;
    description_2: string;
  };
  update_status: {
    title: string;
    description: string;
    description_2: string;
  };
  remove_flagger: PopConfirmStruct;
  remove_user: PopConfirmStruct;
}

export interface Tooltips {
  ids_release: string;
  rollouts_0: string;
  rollouts_1: string;
  rollouts_2: string;
  remove: string;
  add: string;
  inactive: string;
  active: string;
  about: string;
}

export interface PlaceHolders {
  search: string;
  type_it: string;
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  language: string;
}

export interface Titles {
  flaggers: string;
  companies: string;
  login: string;
  legends: string;
  chartCompaniesInRollouts: string;
  flaggersExpirateded: string;
  notFlaggersExpirateded: string;
}

export interface LabelsForm {
  name: string;
  email: string;
  status: string;
  password: string;
  language: string;
  create_rollout: string;
  update_release: string;
  update_user: string;
  remove_rollout: string;
  admin: string;
  confirmPassword: string;
  flagger: string;
  expiration_at: string;
  full_rollout: string;
  description: string;
}

export interface Rules {
  name: string;
  email: string;
  invalidEmail: string;
  password: string;
  passwordNotEqual: string;
  language: string;
  flagger: string;
  expiration_at: string;
  description: string;
}

export interface ActionsButtons {
  cancel: string;
  save: string;
  yes: string;
  no: string;
  logout: string;
  create_new: string;
  enter: string;
  entering: string;
}

export interface Menu {
  data: string;
  rollouts: string;
  users: string;
  profile: string;
}

export interface Drawers {
  register_flagger: string;
  register_user: string;
  user_data: string;
  profile: string;
  release: string;
}
