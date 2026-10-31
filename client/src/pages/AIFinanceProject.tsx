import CaseLayout from '@/components/case/CaseLayout';
import CaseHeader, { GITHUB_PROFILE } from '@/components/case/CaseHeader';
import { CaseSection, CardGrid, FeatureList, Prose, SubHeading, TechStack } from '@/components/case/CaseBlocks';

// A real sequence, so an ordered list. The NLP step follows the load and is
// badged "AI" instead of a number.
const STEPS: { badge: string; title: string; desc: string }[] = [
  { badge: '1', title: 'Extract', desc: 'S&P 500, Brent crude, USD/SGD FX, Maersk shares (a stand-in for logistics stocks) and geopolitical news' },
  { badge: '2', title: 'Validate (raw gate)', desc: 'Schema checks, row count parity and missing-value detection' },
  { badge: '3', title: 'Transform', desc: 'Rolling volatility, moving averages, cross-asset correlations and standard deviations' },
  { badge: '4', title: 'Validate (clean gate)', desc: 'Schema correctness and row parity, checked before the database load' },
  { badge: '5', title: 'Load', desc: 'Into a SQLite data warehouse, with a pipeline_runs audit table' },
  { badge: 'AI', title: 'NLP engine', desc: 'Sorts headlines into 9 sectors, scores their sentiment, flags supply-chain risk and writes a daily executive brief' },
];

/** Pipeline cards joined by 3px ink connectors: a column on phones, 3 + 3 from lg */
function PipelineSteps() {
  return (
    <ol className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {STEPS.map(({ badge, title, desc }, i) => (
        <li key={title} className="relative border-2 border-black bg-[var(--cream)] p-4 sm:p-5">
          {i > 0 && (
            <span aria-hidden="true" className="lg:hidden absolute left-6 -top-[26px] h-6 w-[3px] bg-black" />
          )}
          {i % 3 !== 0 && (
            <span aria-hidden="true" className="hidden lg:block absolute -left-[26px] top-1/2 h-[3px] w-6 bg-black" />
          )}
          <div className="flex items-center gap-3 border-b-[3px] border-black pb-3 mb-3">
            <span
              className={`flex-shrink-0 border-2 border-black px-2 py-1 font-pixel text-xs text-black tabular-nums ${badge === 'AI' ? 'bg-[var(--teal)]' : 'bg-[var(--orange)]'}`}
            >
              {badge === 'AI' ? 'AI' : <><span className="sr-only">Step </span>{badge}</>}
            </span>
            <h4 className="font-pixel text-xs sm:text-sm leading-[1.5] text-black">{title}</h4>
          </div>
          <p className="font-mono text-[15px] sm:text-base leading-[1.65] text-[color:var(--navy)]">{desc}</p>
        </li>
      ))}
    </ol>
  );
}

export default function AIFinanceProject() {
  return (
    <CaseLayout slug="ai-finance">
      {/* No cover: John hasn't confirmed the tile image is the project's real output */}
      <CaseHeader
        slug="ai-finance"
        file="ai_finance_insights.py"
        cover={false}
        meta={[
          { label: 'Type', value: 'Data pipeline with NLP' },
          { label: 'Domain', value: 'Shipping and logistics markets' },
        ]}
        links={[GITHUB_PROFILE]}
        stats={[
          { value: '5', label: 'data sources' },
          { value: '9', label: 'news sectors' },
          { value: '2', label: 'data-quality gates' },
          { value: '100%', label: 'Pytest coverage on extract and transform' },
        ]}
      />

      <CaseSection id="problem" heading="The problem" icon="icon-about" file="problem.txt">
        <Prose>
          <p>
            Shipping and logistics analysts work from scattered data: the S&amp;P 500, Brent crude
            prices, USD/SGD exchange rates, logistics stocks and geopolitical news each live in a
            different place, with no single view.
          </p>
        </Prose>
      </CaseSection>

      <CaseSection id="what" heading="What it does" icon="icon-projects" file="what_it_does.md">
        <FeatureList
          items={[
            'Pulls in the S&P 500, Brent crude, USD/SGD FX, Maersk shares (as a stand-in for logistics stocks) and geopolitical news',
            'Computes rolling volatility, moving averages, cross-asset correlations and standard-deviation outliers',
            'Sorts headlines into 9 sectors, scores their sentiment and flags supply-chain risk',
            'Writes a daily executive brief',
            'Loads everything into a SQLite warehouse, ready for Power BI',
          ]}
        />
      </CaseSection>

      <CaseSection id="decisions" heading="Key decisions" icon="icon-skills" file="key_decisions.md">
        <div className="space-y-10">
          <div className="space-y-6">
            <SubHeading>Five stages, two gates</SubHeading>
            <Prose>
              <p>
                Extract, validate, transform, validate, load. Each gate checks schema, row counts and
                missing values, so bad data stops before the database. An NLP step then enriches the
                news.
              </p>
            </Prose>
            <PipelineSteps />
          </div>
          <CardGrid
            cols={2}
            cards={[
              { title: 'Star schema for Power BI', body: 'Fact and dimension tables, with a Dim_Date table for slicing by time.' },
              { title: 'Every run is traceable', body: 'A pipeline_runs table logs each run, and all settings live in one config.py.' },
              { title: 'Tested where the maths is', body: 'Pytest covers 100% of extraction and transformation, including schema assignment and the calculations.' },
              { title: 'Room to grow', body: 'Built with a place to plug in an LLM API.' },
            ]}
          />
        </div>
      </CaseSection>

      <CaseSection id="outcome" heading="Outcome" icon="icon-results" file="outcome.txt">
        <Prose>
          <p>
            A tested pipeline that loads five sources into one star-schema warehouse, with 100% Pytest
            coverage on extraction and transformation.
          </p>
        </Prose>
      </CaseSection>

      <CaseSection id="stack" heading="Tech stack" icon="floppy" file="stack.txt">
        <TechStack tags={['Python', 'Pandas', 'NumPy', 'SQLite', 'Pytest', 'Power BI']} />
      </CaseSection>
    </CaseLayout>
  );
}
