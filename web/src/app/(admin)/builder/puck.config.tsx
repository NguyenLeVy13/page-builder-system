import type { Config } from "@measured/puck";

import type { BlankProps } from "./blocks/Blank";
import { Blank } from "./blocks/Blank";
import type { HeadingProps } from "./blocks/Heading";
import { Heading } from "./blocks/Heading";
import type { CardProps } from "./blocks/Card";
import { Card } from "./blocks/Card";
import type { ButtonGroupProps } from "./blocks/ButtonGroup";
import { ButtonGroup } from "./blocks/ButtonGroup";
import type { ColumnsProps } from "./blocks/Columns";
import { Columns } from "./blocks/Columns";
import type { FeatureListProps } from "./blocks/FeatureList";
import { FeatureList } from "./blocks/FeatureList";
import type { HeroProps } from "./blocks/Hero";
import { Hero } from "./blocks/Hero";
import type { LogosProps } from "./blocks/Logos";
import { Logos } from "./blocks/Logos";
import type { StatsProps } from "./blocks/Stats";
import { Stats } from "./blocks/Stats";
import type { TextProps } from "./blocks/Text";
import { Text } from "./blocks/Text";
import type { VerticalSpaceProps } from "./blocks/VerticalSpace";
import { VerticalSpace } from "./blocks/VerticalSpace";

type Props = {
  Blank: BlankProps;
  Heading: HeadingProps;
  Card: CardProps;
  ButtonGroup: ButtonGroupProps;
  Columns: ColumnsProps;
  FeatureList: FeatureListProps;
  Hero: HeroProps;
  Logos: LogosProps;
  Stats: StatsProps;
  Text: TextProps;
  VerticalSpace: VerticalSpaceProps;
};

export const config: Config<Props> = {
  components: {
    Blank,
    Heading,
    Card,
    ButtonGroup,
    Columns,
    FeatureList,
    Hero,
    Logos,
    Stats,
    Text,
    VerticalSpace,
  },
};

export default config;
