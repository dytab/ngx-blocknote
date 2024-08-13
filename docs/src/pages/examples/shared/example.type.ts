export type Example = {
  groupName: string;
  url: string;
  name: string;
  component: any;
};

export type ExampleGroup = {
  groupName: string;
  links: Example[];
};
