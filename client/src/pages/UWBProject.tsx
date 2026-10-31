import CaseLayout from '@/components/case/CaseLayout';
import CaseHeader, { GITHUB_PROFILE } from '@/components/case/CaseHeader';
import { CaseSection, CardGrid, FeatureList, FigureList, Prose, TechStack } from '@/components/case/CaseBlocks';
import ScreenGallery, { type Shot } from '@/components/case/ScreenGallery';
import confusionImg from '@assets/da_p40_img1.png';
import decisionBoundaryImg from '@assets/da_p39_img2.png';
import dtAccuracyImg from '@assets/da_p35_img1.png';
import pcaImg from '@assets/da_p9_img1.png';
import comparisonImg from '@assets/da_p41_img1.png';

const SHOTS: Shot[] = [
  {
    file: 'pca_variance.png', src: pcaImg, width: 989, height: 490, span: 'full',
    caption: 'PCA on the CIR: 848 components keep 95% of the variance, 963 keep 99%.',
    alt: 'Line chart of cumulative explained variance by number of principal components, crossing 95% at 848 components and 99% at 963.',
  },
  {
    file: 'confusion_matrices.png', src: confusionImg, width: 1229, height: 490, span: 'full',
    caption: 'On 8,400 test samples, SVM-RBF gets 7,527 right; logistic regression gets 7,203.',
    alt: 'Two confusion matrices. Logistic regression: 3,809 and 3,394 correct, 391 and 806 wrong. SVM-RBF: 3,928 and 3,599 correct, 272 and 601 wrong.',
  },
  {
    file: 'model_comparison.png', src: comparisonImg, width: 1389, height: 490, span: 'full',
    caption: 'SVM-RBF beats logistic regression on every metric; range error is 1.7566 m on both paths.',
    alt: 'Bar charts. Logistic regression vs SVM-RBF: accuracy 0.8575 vs 0.8961, precision 0.8967 vs 0.9297, recall 0.8081 vs 0.8569, F1 0.8501 vs 0.8918. Range RMSE 1.7566 m for path 1 and path 2.',
  },
  {
    file: 'tree_depth.png', src: dtAccuracyImg, width: 1013, height: 646, span: 'half',
    caption: 'Decision tree accuracy by depth; depth 4 chosen (train 0.874, test 0.867).',
    alt: 'Line chart of decision tree training and test accuracy for depths 2 to 50. Training accuracy climbs to 1.0; test accuracy peaks near depth 10 and settles around 0.87. Depth 4 is marked.',
  },
  {
    file: 'decision_boundaries.png', src: decisionBoundaryImg, width: 1097, height: 1120, span: 'half',
    caption: 'Decision boundaries on two features: range and first-path index.',
    alt: 'Six panels of decision boundaries on scaled RANGE and FP_IDX for KNN, naive Bayes, logistic regression, linear SVM, non-linear SVM and an MLP.',
  },
];

export default function UWBProject() {
  return (
    <CaseLayout slug="uwb">
      <CaseHeader
        slug="uwb"
        file="uwb_localization.py"
        meta={[
          { label: 'Type', value: 'Course project, CSC3105 Data Analytics, SIT', wide: true },
          { label: 'Team', value: 'Group CS05' },
          { label: 'My role', value: 'Data mining methodology' },
        ]}
        links={[GITHUB_PROFILE]}
        stats={[
          { value: '89.61%', label: 'SVM-RBF accuracy' },
          { value: '0.9612', label: 'ROC-AUC' },
          { value: '41,996', label: 'samples' },
          { value: '7', label: 'indoor environments' },
        ]}
      />

      <CaseSection id="problem" heading="The problem" icon="icon-about" file="problem.txt">
        <Prose>
          <p>
            UWB radio can locate things indoors to within centimetres under ideal conditions. When
            walls, furniture or people block the direct path (non-line-of-sight, NLOS), accuracy
            drops sharply.
          </p>
          <p>
            Knowing which signals are blocked is a step toward more reliable indoor positioning for
            robots, drones, warehouses and asset tracking.
          </p>
        </Prose>
      </CaseSection>

      <CaseSection id="what" heading="What it does" icon="icon-projects" file="what_it_does.md">
        <FeatureList
          items={[
            'Classifies the two shortest dominant signal paths as a (clear, blocked) or (blocked, blocked) pair',
            'Estimates the measured range for both paths with linear regression',
            'Compares models before choosing SVM-RBF',
          ]}
        />
      </CaseSection>

      <CaseSection id="part" heading="My part" icon="icon-experience" file="my_part.log">
        <div className="space-y-6">
          <Prose lead="I worked on the data mining methodology:" />
          <FeatureList
            columns={2}
            items={[
              'Chose and justified the models (SVM, logistic regression, decision tree)',
              'Set up a stratified 80/20 train-test split',
              'Fitted RobustScaler on training data only, to prevent leakage',
              'Picked the SVM-RBF C value by watching train and test scores diverge',
              'Built multivariate linear regression to estimate range on both paths',
              'Plotted decision boundaries for the classifiers',
              'Analysed feature importance',
              'Explained the results in terms of NLOS and multipath effects',
            ]}
          />
        </div>
      </CaseSection>

      <CaseSection id="how" heading="How it works" icon="icon-skills" file="how_it_works.md">
        <CardGrid
          cols={3}
          cards={[
            { title: 'No leakage', body: 'Stratified 80/20 split; the scaler only ever sees training data.' },
            { title: 'Fewer, better inputs', body: 'Dropped zero-variance features (CH, BITRATE), applied PCA to 1,016 channel impulse response (CIR) dimensions, and engineered features to compensate for NLOS signal loss.' },
            { title: 'Model choice', body: 'Logistic regression as the baseline, SVM-RBF as the main model, a decision tree at depth 4.' },
          ]}
        />
      </CaseSection>

      <ScreenGallery heading="Charts" shots={SHOTS} />

      <CaseSection id="results" heading="Results" icon="icon-results" file="results.txt">
        <FigureList
          items={[
            { value: '85.75%', label: 'logistic regression accuracy' },
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
