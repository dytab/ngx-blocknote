import { ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { TestHostBlockNodeEditorComponent } from './test-host.component';

export default {
  title: 'Block Node Editor',
  component: TestHostBlockNodeEditorComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
      providers: [],
    }),
  ],
} as Meta<TestHostBlockNodeEditorComponent>;

const Template: Story<TestHostBlockNodeEditorComponent> = (
  args: TestHostBlockNodeEditorComponent
) => ({
  props: args,
});

export const BasicUsage = Template.bind({});
BasicUsage.args = {};
