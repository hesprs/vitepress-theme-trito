<script setup lang="ts">
import { computed } from 'vue';
import type { TritoTheme } from '@/shared';
import VPTeamMembersItem from './VPTeamMembersItem.vue';

type Props = {
	size?: 'small' | 'medium';
	members: Array<TritoTheme.TeamMember>;
};

const { size = 'medium', members } = defineProps<Props>();

const classes = computed(() => [size, `count-${members.length}`]);
</script>

<template>
	<div class="VPTeamMembers" :class="classes">
		<div class="container">
			<div v-for="member in members" :key="member.name" class="item">
				<VPTeamMembersItem :size :member />
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
	display: grid;
	gap: 24px;
	margin: 0 auto;
	max-width: 1152px;
}

.VPTeamMembers.small .container {
	grid-template-columns: repeat(auto-fit, minmax(224px, 1fr));
}

.VPTeamMembers.small.count-1 .container {
	max-width: 276px;
}
.VPTeamMembers.small.count-2 .container {
	max-width: calc(276px * 2 + 24px);
}
.VPTeamMembers.small.count-3 .container {
	max-width: calc(276px * 3 + 24px * 2);
}

.VPTeamMembers.medium .container {
	grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
}

@media (min-width: 375px) {
	.VPTeamMembers.medium .container {
		grid-template-columns: repeat(auto-fit, minmax(288px, 1fr));
	}
}

.VPTeamMembers.medium.count-1 .container {
	max-width: 368px;
}
.VPTeamMembers.medium.count-2 .container {
	max-width: calc(368px * 2 + 24px);
}
</style>
