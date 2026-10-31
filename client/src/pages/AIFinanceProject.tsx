import CaseLayout from '@/components/case/CaseLayout';
import CaseHeader, { GITHUB_PROFILE } from '@/components/case/CaseHeader';
import { CaseSection, TechStack } from '@/components/case/CaseBlocks';
import FlowDiagram, { type FlowStep } from '@/components/FlowDiagram';
import { PixelList } from '@/components/Hierarchy';

// A real sequence: five stages with two gates, then the NLP step on the loaded news
const PIPELINE: FlowStep[] = [
  { label: 'Extract', detail: 'S&P 500, Brent crude, USD/SGD, Maersk (logistics stand-in), news' },
  { label: 'Validate (raw gate)', detail: 'Schema, row counts, missing values' },
  { label: 'Transform', detail: 'Volatility, moving averages, correlations, standard deviations' },
  { label: 'Validate (clean gate)', detail: 'Schema and row parity before load' },
  { label: 'Load', detail: 'SQLite warehouse with a pipeline_runs audit table' },
  { label: 'NLP engine', actor: 'AI', detail: '9 sectors, sentiment, supply-chain risk, daily executive brief' },
];

export default function AIFinanceProject() {
  return (
    <CaseLayout slug="ai-finance">
      {/* No screenshot: John hasn't confirmed the tile image is the project's
          real output, so the pipeline diagram takes the hero slot */}
      <CaseHeader
        slug="ai-finance"
        file="ai_finance_insights.py"
        facts={[
          { icon: 'icon-projects', text: 'Data pipeline with NLP' },
          { icon: 'globe', text: 'Shipping and logistics' },
        ]}
        links={[GITHUB_PROFILE]}
        stats={[
          { value: '5', label: 'data sources' },
          { value: '9', label: 'news sectors' },
          { value: '2', label: 'data-quality gates' },
          { value: '100%', label: 'Pytest coverage on extract and transform' },
        ]}
      />

      <CaseSection
        id="how"
        heading="How it works"
        icon="icon-skills"
        lead="Five stages, **two quality gates**: bad data stops before the database."
        file="how_it_works.md"
      >
        <div className="space-y-8 lg:space-y-10">
          <FlowDiagram steps={PIPELINE} labelledBy="how-heading" lgCols={3} />
          <PixelList
            items={[
              '**Star schema** with a Dim_Date table, ready for Power BI.',
              '**100% Pytest coverage** on extraction and transformation.',
              'Every run logged; all settings in one **config.py**.',
            ]}
          />
        </div>
      </CaseSection>

      <CaseSection
        id="problem"
        heading="The problem"
        icon="icon-about"
        lead="Shipping and logistics analysts juggle **5 scattered sources**, with no single view."
      />

      <CaseSection
        id="what"
        heading="What it does"
        icon="icon-projects"
        lead="Turns market data and news into a **Power BI**-ready warehouse and daily brief."
        file="what_it_does.md"
      >
        <PixelList
          items={[
            'Pulls S&P 500, Brent crude, USD/SGD, **Maersk** shares and geopolitical news.',
            'Computes **volatility**, moving averages and cross-asset correlations.',
            'Sorts headlines into **9 sectors**, scores sentiment and flags supply-chain risk.',
          ]}
        />
      </CaseSection>

      <CaseSection id="stack" heading="Tech stack" icon="floppy" file="stack.txt">
        <TechStack tags={['Python', 'Pandas', 'NumPy', 'SQLite', 'Pytest', 'Power BI']} />
      </CaseSection>
    </CaseLayout>
  );
}
