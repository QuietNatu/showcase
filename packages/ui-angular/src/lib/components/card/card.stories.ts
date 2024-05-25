import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  argsToTemplate,
  applicationConfig,
} from '@storybook/angular';
import { NatuCardComponent, natuCardImports } from './card.component';
import { SvgIconComponent, provideSvgIcons } from '@natu/assets';
import { rocketIcon } from '@natu/assets/svg/rocket';
import { NatuCardHeaderComponent } from './components/card-header.component';
import { NatuCardFooterComponent } from './components/card-footer.component';
import { NatuCardBodyComponent } from './components/card-body.component';
import { NatuCardHeaderIconDirective } from './directives/card-header-icon.directive';
import { TestComponentArgs } from '../../test/types';

interface StoryProps extends NatuCardComponent {
  hideHeader?: boolean;
  hideFooter?: boolean;
  headerArgs?: TestComponentArgs<NatuCardHeaderComponent>;
  footerArgs?: TestComponentArgs<NatuCardFooterComponent>;
}

const meta = {
  title: 'Components/Card',
  component: NatuCardComponent,
  subcomponents: {
    NatuCardHeaderIconDirective,
    NatuCardHeaderComponent,
    NatuCardBodyComponent,
    NatuCardFooterComponent,
  },
  decorators: [
    applicationConfig({
      providers: [provideSvgIcons([rocketIcon])],
    }),
    moduleMetadata({ imports: [natuCardImports, SvgIconComponent] }),
  ],
  render: (args) => {
    const { hideHeader, hideFooter, headerArgs, footerArgs, ...cardArgs } = args;

    const templateArgs = argsToTemplate(cardArgs);
    const headerTemplateArgs = headerArgs?.size ? '[size]="headerArgs.size"' : '';
    const footerTemplateArgs = `[hasDivider]="${footerArgs?.hasDivider}" ${
      footerArgs?.size ? '[size]="footerArgs.size"' : ''
    }`;

    return {
      props: args,
      template: `
        <natu-card ${templateArgs} style="height: 400px">
          @if(!hideHeader) {
            <natu-card-header ${headerTemplateArgs}>
              <svg-icon natuCardHeaderIcon [key]="'rocket'" />
              <span>Example header</span>
            </natu-card-header>
          }

          <natu-card-body>Example body</natu-card-body>

          @if(!hideFooter) {
            <natu-card-footer ${footerTemplateArgs}>Example footer</natu-card-footer>
          }
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

export const NoHeaderOrFooter: Story = {
  args: {
    hideHeader: true,
    hideFooter: true,
  },
};
