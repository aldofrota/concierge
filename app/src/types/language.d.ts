export interface Language {
  copy: string;
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
  remove_flagger: PopConfirmStruct;
}

export interface Tooltips {
  ids_release: string;
  rollouts_0: string;
  rollouts_1: string;
  rollouts_2: string;
  remove: string;
  add: string;
}

export interface PlaceHolders {
  search: string;
  type_it: string;
}

export interface Titles {
  flaggers: string;
  companies: string;
}

export interface LabelsForm {
  password: string;
  confirmPassword: string;
  flagger: string;
  expiration_at: string;
  full_rollout: string;
  description: string;
}

export interface Rules {
  password: string;
  flagger: string;
  expiration_at: string;
  full_rollout: string;
  description: string;
}

export interface ActionsButtons {
  cancel: string;
  save: string;
  yes: string;
  no: string;
  logout: string;
}

export interface Menu {
  data: string;
  rollouts: string;
  users: string;
  profile: string;
}

export interface Drawers {
  register_flagger: string;
  profile: string;
  release: string;
  register_user: string;
}
