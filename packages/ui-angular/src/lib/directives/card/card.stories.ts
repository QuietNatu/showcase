import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  argsToTemplate,
  applicationConfig,
} from '@storybook/angular';
import { NatuCardComponent, natuCardImports } from './card.component';
import { SvgIconComponent, provideSvgIcons } from '@natu/assets';
import { dnaIcon } from '@natu/assets/svg/dna';
import { NatuCardHeaderComponent } from './components/card-header.component';
import { NatuCardFooterComponent } from './components/card-footer.component';

interface StoryProps extends NatuCardComponent {
  headerArgs?: Partial<NatuCardHeaderComponent>;
  footerArgs?: Partial<NatuCardFooterComponent>;
}

const meta = {
  title: 'Components/Card',
  component: NatuCardComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideSvgIcons([dnaIcon])],
    }),
    moduleMetadata({ imports: [natuCardImports, SvgIconComponent] }),
  ],
  render: (args) => {
    const { headerArgs, footerArgs, ...cardArgs } = args;

    const templateArgs = argsToTemplate(cardArgs);
    const headerTemplateArgs = headerArgs?.size ? '[size]="headerArgs.size"' : '';
    const footerTemplateArgs = `[hasDivider]="${footerArgs?.hasDivider}" ${
      footerArgs?.size ? '[size]="footerArgs.size"' : ''
    }`;

    return {
      props: args,
      template: `
        <natu-card ${templateArgs} style="height: 400px">
          <natu-card-header ${headerTemplateArgs}>
            <svg-icon natuCardHeaderIcon [key]="'dna'" />

            <span>Example header</span>
          </natu-card-header>

          <natu-card-body>Example body</natu-card-body>

          <natu-card-footer ${footerTemplateArgs}>Example footer</natu-card-footer>
        </natu-card>
      `,
    };
  },
} satisfies Meta<StoryProps>;

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {};

export const Dismissable: Story = {
  args: { isDismissable: true },
};

export const Embedded: Story = {
  args: { isEmbedded: true },
};

export const Small: Story = {
  args: {
    isDismissable: true,
    headerArgs: { size: 'small' },
    footerArgs: { size: 'small' },
  },
};

export const WithFooterDivider: Story = {
  args: {
    footerArgs: { hasDivider: true },
  },
};
