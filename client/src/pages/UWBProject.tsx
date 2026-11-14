import CaseLayout from '@/components/case/CaseLayout';
import CaseHeader, { GITHUB_PROFILE } from '@/components/case/CaseHeader';
import { CaseSection, LeadS, TechStack } from '@/components/case/CaseBlocks';
import ScreenGallery, { type Shot } from '@/components/case/ScreenGallery';
import FlowDiagram, { type FlowStep } from '@/components/FlowDiagram';
import { PixelList } from '@/components/Hierarchy';
import StatStrip from '@/components/StatStrip';
import decisionBoundaryImg from '@assets/da_p39_img2.png';
import dtAccuracyImg from '@assets/da_p35_img1.png';
import pcaImg from '@assets/da_p9_img1.png';

const HERO_SHOT: Shot = {
  file: 'model_comparison.png',
  src: '/assets/case/uwb/model-comparison-desktop@2x.webp', width: 1018, height: 527,
  srcMobile: '/assets/case/uwb/model-comparison-mobile@2x.webp', mobileWidth: 360, mobileHeight: 561,
  fullSrc: '/assets/case/uwb/model-comparison-desktop.svg',
  caption: 'SVM-RBF wins on every metric; range RMSE 1.757 m on both paths.',
  alt: 'Bar charts. Logistic regression vs SVM-RBF: accuracy 0.8575 vs 0.8961, precision 0.8967 vs 0.9297, recall 0.8081 vs 0.8569, F1 0.8501 vs 0.8918. Range RMSE 1.7566 m for path 1 and path 2.',
};

const SHOTS: Shot[] = [
  {
    file: 'pca_variance.png', src: pcaImg, width: 989, height: 490,
    caption: 'PCA: 848 components, 95% variance.',
    alt: 'Line chart of cumulative explained variance by number of principal components, crossing 95% at 848 components and 99% at 963.',
  },
  {
    file: 'confusion_matrices.png',
    src: '/assets/case/uwb/confusion-matrices-desktop@2x.webp', width: 1018, height: 509,
    srcMobile: '/assets/case/uwb/confusion-matrices-mobile@2x.webp', mobileWidth: 360, mobileHeight: 712,
    fullSrc: '/assets/case/uwb/confusion-matrices-desktop.svg',
    caption: 'Correct of 8,400: SVM-RBF 7,527; baseline 7,203.',
    alt: 'Two confusion matrices, true label by predicted label (LOS+NLOS, NLOS+NLOS). Logistic regression: 3,809 and 3,394 correct, 391 and 806 wrong. SVM-RBF: 3,928 and 3,599 correct, 272 and 601 wrong.',
  },
  {
    file: 'tree_depth.png', src: dtAccuracyImg, width: 1013, height: 646,
    caption: 'Tree depth 4 chosen (test 0.867).',
    alt: 'Line chart of decision tree training and test accuracy for depths 2 to 50. Training accuracy climbs to 1.0; test accuracy peaks near depth 10 and settles around 0.87. Depth 4 is marked.',
  },
  {
    file: 'decision_boundaries.png', src: decisionBoundaryImg, width: 1097, height: 1120,
    caption: 'Boundaries: range vs first-path index.',
    alt: 'Six panels of decision boundaries on scaled RANGE and FP_IDX for KNN, naive Bayes, logistic regression, linear SVM, non-linear SVM and an MLP.',
  },
];

// The order of PCA and the 80/20 split isn't confirmed (NEEDS JOHN), so data
// preparation is one step with unordered parts; the two models run in parallel.
const PIPELINE: FlowStep[] = [
  { label: '41,996 samples', detail: '7 indoor environments' },
  {
    label: 'Prepare data',
    items: [
      { label: 'PCA', detail: '1,016 CIR dimensions' },
      { label: '80/20 split', detail: 'Stratified' },
      { label: 'RobustScaler', detail: 'Fitted on training data only' },
    ],
  },
  {
    label: 'Model',
    items: [
      { label: 'Classify paths', detail: 'Clear or blocked, SVM-RBF' },
      { label: 'Estimate range', detail: 'Linear regression' },
    ],
  },
  { label: 'Evaluate', detail: 'Accuracy, ROC-AUC, RMSE' },
];

export default function UWBProject() {
  return (
    <CaseLayout slug="uwb">
      <CaseHeader
        slug="uwb"
        file="uwb_localization.py"
        facts={[
          { icon: 'chip-school', text: 'CSC3105 Data Analytics, SIT' },
          { icon: 'chip-team', text: 'Team: Group CS05' },
          { icon: 'icon-experience', text: 'Role: data mining methods' },
        ]}
        links={[GITHUB_PROFILE]}
        stats={[
          { value: '89.61%', label: 'SVM-RBF accuracy' },
          { value: '0.9612', label: 'ROC-AUC' },
          { value: '41,996', label: 'samples' },
          { value: '7', label: 'indoor environments' },
        ]}
        heroShot={HERO_SHOT}
      />

      <CaseSection
        id="problem"
        heading="The problem"
        icon="icon-about"
        lead="UWB positions to centimetres at best; blocked (NLOS) signals **cut accuracy sharply**."
        file="problem.txt"
      >
        <PixelList items={['Spotting them is a step toward reliable positioning for **robots and drones**.']} />
      </CaseSection>

      <CaseSection
        id="what"
        heading="What it does"
        icon="icon-projects"
        lead="Classifies the two shortest **dominant paths** as clear or blocked."
        file="what_it_does.md"
      >
        <PixelList items={['**Linear regression** estimates range on both paths.']} />
      </CaseSection>

      <ScreenGallery heading="Charts" shots={SHOTS} />

      <CaseSection id="part" heading="My part" icon="icon-experience" file="my_part.log">
        <div className="space-y-3 lg:space-y-4">
          <LeadS text="I worked on the **data mining methodology**." />
          <PixelList
            items={[
              'Chose and justified the models: **SVM**, logistic regression, decision tree.',
              'Prevented **leakage**: stratified 80/20 split, scaler fitted on training data only.',
              'Built **linear regression** for range and plotted decision boundaries.',
            ]}
          />
        </div>
      </CaseSection>

      <CaseSection
        id="how"
        heading="How it works"
        icon="icon-skills"
        lead="**PCA** shrinks 1,016 CIR dimensions before modelling."
        file="how_it_works.md"
      >
        <div className="space-y-8 lg:space-y-10">
          <FlowDiagram steps={PIPELINE} labelledBy="how-heading" lgCols={4} />
          <PixelList items={['Dropped zero-variance features; engineered features for **NLOS signal loss**.']} />
        </div>
      </CaseSection>

      <CaseSection
        id="results"
        heading="Results"
        icon="icon-results"
        lead="**SVM-RBF** beat the baseline: 89.61% vs 85.75%."
        file="results.txt"
      >
        <StatStrip
          variant="inline"
          stats={[
            { value: '0.9195', label: 'logistic regression ROC-AUC' },
            { value: '1.757 m', label: 'range RMSE' },
            { value: '0.458', label: 'path 1 R²' },
            { value: '0.6809', label: 'path 2 R²' },
          ]}
        />
      </CaseSection>

      <CaseSection id="stack" heading="Tech stack" icon="floppy" file="stack.txt">
        <TechStack
          tags={['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Matplotlib']}
          more={{ label: 'Methods', tags: ['SVM-RBF', 'Logistic regression', 'Decision tree', 'Linear regression', 'PCA', 'RobustScaler'] }}
        />
      </CaseSection>
    </CaseLayout>
  );
}
