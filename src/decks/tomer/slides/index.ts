/**
 * Slide Registry - Exports all slides in order
 * Each slide is a separate component for easy editing
 */

import Slide01_Title from './Slide01_Title'
import Slide07_ArchitectureBeginning from './Slide07_ArchitectureBeginning'
import Slide08_ArchitectureAI from './Slide08_ArchitectureAI'
import Slide11_MetadataChallenge from './Slide11_MetadataChallenge'
import Slide12_MetadataComparison from './Slide12_MetadataComparison'
import Slide19_BEPtree from './Slide19_BEPtree'
import Slide20_GlobalKeyspace from './Slide20_GlobalKeyspace'
import Slide26_EasyManagement from './Slide26_EasyManagement'
import Slide27_ContainerizedServices from './Slide27_ContainerizedServices'
import Slide30_MultiTenancy from './Slide30_MultiTenancy'
import Slide40_CapabilityMatrix from './Slide40_CapabilityMatrix'
import Slide41_CurrentLimits from './Slide41_CurrentLimits'
import Slide46_EmbeddedVsNative from './Slide46_EmbeddedVsNative'
import Slide48_NativeDataServices from './Slide48_NativeDataServices'
import Slide50_S3Compatibility from './Slide50_S3Compatibility'
import Slide53_REDSQL from './Slide53_REDSQL'

// Export all slides as an ordered array
export const slides = [
  Slide01_Title,
  Slide07_ArchitectureBeginning,
  Slide08_ArchitectureAI,
  Slide11_MetadataChallenge,
  Slide12_MetadataComparison,
  Slide19_BEPtree,
  Slide20_GlobalKeyspace,
  Slide26_EasyManagement,
  Slide27_ContainerizedServices,
  Slide30_MultiTenancy,
  Slide40_CapabilityMatrix,
  Slide41_CurrentLimits,
  Slide46_EmbeddedVsNative,
  Slide48_NativeDataServices,
  Slide50_S3Compatibility,
  Slide53_REDSQL,
]

// Slide metadata for navigation
export const slideMetadata = [
  { id: 1, title: 'Infinia Technical Overview', section: 'Introduction' },
  { id: 7, title: 'Architecture Beginning', section: 'Architecture' },
  { id: 8, title: 'Architecture AI Era', section: 'Architecture' },
  { id: 11, title: 'Metadata Challenge', section: 'Data Plane' },
  { id: 12, title: 'Metadata Comparison', section: 'Data Plane' },
  { id: 19, title: 'BEPtree Comparison', section: 'Data Plane' },
  { id: 20, title: 'Global Keyspace', section: 'Data Plane' },
  { id: 26, title: 'Easy Management', section: 'Control Plane' },
  { id: 27, title: 'Containerized Services', section: 'Control Plane' },
  { id: 30, title: 'Multi-Tenancy', section: 'Control Plane' },
  { id: 40, title: 'Capability Matrix', section: 'Control Plane' },
  { id: 41, title: 'Current Limits', section: 'Control Plane' },
  { id: 46, title: 'Embedded vs Native', section: 'Data Services' },
  { id: 48, title: 'Native Data Services', section: 'Data Services' },
  { id: 50, title: 'S3 Compatibility', section: 'Data Services' },
  { id: 53, title: 'RED SQL', section: 'Data Services' },
]

export const totalSlides = slides.length

// Re-export individual slides for direct imports if needed
export {
  Slide01_Title,
  Slide07_ArchitectureBeginning,
  Slide08_ArchitectureAI,
  Slide11_MetadataChallenge,
  Slide12_MetadataComparison,
  Slide19_BEPtree,
  Slide20_GlobalKeyspace,
  Slide26_EasyManagement,
  Slide27_ContainerizedServices,
  Slide30_MultiTenancy,
  Slide40_CapabilityMatrix,
  Slide41_CurrentLimits,
  Slide46_EmbeddedVsNative,
  Slide48_NativeDataServices,
  Slide50_S3Compatibility,
  Slide53_REDSQL,
}
