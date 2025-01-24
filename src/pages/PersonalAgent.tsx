import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { PersonalAgent as PersonalAgentComponent } from '../components/PersonalAgent';
import AgentDescription from '../components/PersonalAgent/AgentDescription';
import Notifications from '../components/Notifications';
import { PriorityContacts } from '../components/PriorityContacts';
import { UnwantedCalls } from '../components/UnwantedCalls';
import { KeywordRules } from '../components/KeywordRules';
import Plugins from '../components/Plugins';
import { useAgentSettings } from '../hooks/useAgentSettings';
import UnsavedChangesBanner from '../components/UnsavedChangesBanner';
import ModifiedSection from '../components/ModifiedSection';
import AgentToggle from '../components/PersonalAgent/AgentToggle';

const PersonalAgent = () => {
  const location = useLocation();
  const { state, saveSettings, updateField } = useAgentSettings();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  const handleSaveAll = async () => {
    await saveSettings(state.settings);
  };

  const handleToggleAgent = (active: boolean) => {
    updateField('isActive', active, 'agentStatus');
  };

  return (
    <div className="lg:ml-64 p-4 md:p-8 pb-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <Header title="Agente Personal" />
      </div>

      <div className="space-y-6">
        <AgentDescription />

        <ModifiedSection isModified={state.modifiedSections.includes('agentStatus')}>
          <AgentToggle
            isActive={state.settings.isActive}
            onChange={handleToggleAgent}
            isLoading={state.isLoading}
          />
        </ModifiedSection>

        <ModifiedSection isModified={state.modifiedSections.includes('personalInfo')}>
          <PersonalAgentComponent />
        </ModifiedSection>

        <ModifiedSection isModified={state.modifiedSections.includes('notifications')}>
          <Notifications />
        </ModifiedSection>

        <ModifiedSection isModified={state.modifiedSections.includes('priorityContacts')}>
          <PriorityContacts />
        </ModifiedSection>

        <ModifiedSection isModified={state.modifiedSections.includes('unwantedCalls')}>
          <UnwantedCalls />
        </ModifiedSection>

        <ModifiedSection isModified={state.modifiedSections.includes('keywordRules')}>
          <KeywordRules />
        </ModifiedSection>

        <ModifiedSection isModified={state.modifiedSections.includes('plugins')}>
          <Plugins />
        </ModifiedSection>
      </div>

      {state.hasChanges && (
        <UnsavedChangesBanner
          onSave={handleSaveAll}
          isLoading={state.isLoading}
        />
      )}
    </div>
  );
};

export default PersonalAgent;